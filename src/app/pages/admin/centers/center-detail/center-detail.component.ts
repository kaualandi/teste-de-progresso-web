import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Center } from '@app/models/course';
import { User } from '@app/models/user';
import { CourseService } from '@app/services/course.service';
import { UserService } from '@app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-center-detail',
  templateUrl: './center-detail.component.html',
  styleUrls: ['./center-detail.component.scss'],
})
export class CenterDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private notifier: NotifierService
  ) {}

  id = this.route.snapshot.params['id'];
  center = {} as Center;
  loading = false;
  loadingSave = false;
  error = 0;
  users: User[] = [];

  centerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    director: [0, [Validators.required]],
  });

  ngOnInit(): void {
    this.loading = true;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers({}).subscribe({
      next: (response) => {
        this.users = response.filter((u) => !u.is_admin);
        this.getCenter();
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  getCenter() {
    this.courseService.getCenter(this.id).subscribe({
      next: (response) => {
        this.center = response;
        this.centerForm.patchValue(response);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.status || 500;
      },
    });
  }

  handleFormSubmit() {
    if (this.centerForm.invalid) {
      this.centerForm.markAllAsTouched();
      return;
    }

    this.loadingSave = true;
    this.courseService.updateCenter(this.id, this.centerForm.value).subscribe({
      next: () => {
        this.notifier.notify('success', 'Centro salvo com sucesso');
        this.loadingSave = false;
        this.router.navigate(['/admin/centers']);
      },
      error: (error) => {
        this.courseService.formErrorHandler(this.centerForm, error.error);
        this.loadingSave = false;
      },
    });
  }
}
