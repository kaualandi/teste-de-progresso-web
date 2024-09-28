import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  loading = false;
  loadingTable = false;
  error = 0;
  users: User[] = [];
  displayedColumns = ['name', 'email', 'is_admin', 'last_login', 'is_active'];

  filters = this.fb.nonNullable.group({
    name: [''],
  });

  ngOnInit() {
    this.loading = true;
    this.getUsers();
  }

  getUsers() {
    this.loadingTable = true;
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
}