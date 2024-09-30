import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/models/course';
import { User } from '@app/models/user';
import { CourseService } from '@app/services/course.service';
import { UserService } from '@app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private notifier: NotifierService
  ) {}

  id = this.route.snapshot.params['id'];
  course = {} as Course;
  loading = false;
  loadingSave = false;
  error = 0;
  users: User[] = [];

  courseForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    coordinator: [0, [Validators.required]],
    pro_rector: [0, [Validators.required]],
  });

  ngOnInit(): void {
    this.loading = true;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers({}).subscribe({
      next: (response) => {
        this.users = response.filter((u) => !u.is_admin);
        this.getCourse();
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  getCourse() {
    this.courseService.getCourse(this.id).subscribe({
      next: (response) => {
        this.course = response;
        this.courseForm.patchValue(response);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.status || 500;
      },
    });
  }

  handleFormSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    this.loadingSave = true;
    this.courseService.updateCourse(this.id, this.courseForm.value).subscribe({
      next: () => {
        this.notifier.notify('success', 'Curso salvo com sucesso');
        this.loadingSave = false;
        this.router.navigate(['/admin/courses']);
      },
      error: (error) => {
        this.courseService.formErrorHandler(this.courseForm, error.error);
        this.loadingSave = false;
      },
    });
  }
}
