import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@app/components/modals/confirm-modal/confirm-modal.component';
import { CreateUserComponent } from '@app/components/modals/create-user/create-user.component';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { NotifierService } from 'angular-notifier';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private notifier: NotifierService
  ) {}

  loading = false;
  loadingTable = false;
  error = 0;
  users: User[] = [];
  displayedColumns = [
    'name',
    'email',
    'is_admin',
    'last_login',
    'is_active',
    'actions',
  ];

  filters = this.fb.nonNullable.group({
    search: [''],
  });

  ngOnInit() {
    this.loading = true;
    this.getUsers();

    this.filters.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.loadingTable = true;
        this.getUsers();
      });
  }

  getUsers() {
    this.error = 0;
    this.userService.getUsers(this.filters.value).subscribe({
      next: (response) => {
        this.users = response;
        this.loading = false;
        this.loadingTable = false;
      },
      error: (error) => {
        this.loading = false;
        this.loadingTable = false;
        this.error = error.status || 500;
      },
    });
  }

  handleDeleteUserButton(user: User) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Excluir usuário',
        message: `Tem certeza que deseja excluir ${user.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.loadingTable = true;
      this.deleteUser(user.id);
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.notifier.notify('success', 'Usuário excluído com sucesso');
        this.getUsers();
      },
      error: () => {
        this.loadingTable = false;
      },
    });
  }

  handleAddUserButton() {
    this.dialog.open(CreateUserComponent);
  }
}
