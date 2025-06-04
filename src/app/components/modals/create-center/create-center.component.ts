import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '@app/models/user';
import { CourseService } from '@app/services/course.service';
import { UserService } from '@app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-center',
  templateUrl: './create-center.component.html',
  styleUrls: ['./create-center.component.scss'],
})
export class CreateCenterComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CreateCenterComponent>,
    private fb: FormBuilder,
    private courseService: CourseService,
    private userService: UserService,
    private notifier: NotifierService,
    private router: Router
  ) {
    this.dialogRef.addPanelClass('dialog-sm');
  }

  loading = false;
  loadingUsers = false;
  users: User[] = [];
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    director: [0, [Validators.required]],
  });

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loadingUsers = true;
    this.userService.getUsers({}).subscribe({
      next: (users) => {
        this.users = users.filter((user) => !user.is_admin);
        this.loadingUsers = false;
      },
      error: () => {
        this.loadingUsers = false;
      },
    });
  }

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.courseService.createCenter(this.form.value).subscribe({
      next: (response) => {
        this.notifier.notify('success', 'Centro criado com sucesso');
        this.dialogRef.close(true);
        this.router.navigate(['/admin/centers', response.id]);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
