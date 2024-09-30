import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '@app/models/user';
import { CourseService } from '@app/services/course.service';
import { UserService } from '@app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CreateCourseComponent>,
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
    coordinator: [0, [Validators.required]],
    pro_rector: [0, [Validators.required]],
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
    this.courseService.createCourse(this.form.value).subscribe({
      next: (response) => {
        this.notifier.notify('success', 'Curso criado com sucesso');
        this.dialogRef.close(true);
        this.router.navigate(['/admin/courses', response.id]);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
