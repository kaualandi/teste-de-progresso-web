import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@app/components/modals/confirm-modal/confirm-modal.component';
import { CreateRoleComponent } from '@app/components/modals/create-role/create-role.component';
import { Role } from '@app/models/role';
import { RoleService } from '@app/services/role.service';
import { NotifierService } from 'angular-notifier';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  constructor(
    private roleService: RoleService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private notifier: NotifierService
  ) {}

  loading = false;
  loadingTable = false;
  error = 0;
  roles: Role[] = [];
  displayedColumns = [
    'name',
    'permissions',
    'created_at',
    'actions',
  ];

  filters = this.fb.nonNullable.group({
    search: [''],
  });

  ngOnInit() {
    this.loading = true;
    this.getRoles();

    this.filters.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.loadingTable = true;
        this.getRoles();
      });
  }

  getRoles() {
    this.error = 0;
    this.roleService.getRoles(this.filters.value).subscribe({
      next: (response) => {
        this.roles = response;
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

  handleDeleteRoleButton(role: Role) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Excluir perfil',
        message: `Tem certeza que deseja excluir ${role.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.loadingTable = true;
      this.deleteRole(role.id);
    });
  }

  deleteRole(id: number) {
    this.roleService.deleteRole(id).subscribe(() => {
      this.notifier.notify('success', 'Perfil excluído com sucesso');
      this.getRoles();
    });
  }

  handleAddRoleButton() {
    this.dialog.open(CreateRoleComponent);
  }
}
