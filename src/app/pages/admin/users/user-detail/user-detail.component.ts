import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from '@app/models/course';
import { Role } from '@app/models/role';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private notifier: NotifierService
  ) {}

  id = this.route.snapshot.params['id'];
  user = {} as User;
  loading = false;
  loadingSave = 0;
  error = 0;
  courses: Course[] = [];
  roles: Role[] = [];
  linkedCourses = [
    { course: 'CCOMP', role: 'Professor' },
    { course: 'Engenharia', role: 'NDE' },
    { course: 'Medicina', role: 'Diretor de Centro' },
  ];

  formInfors = this.fb.nonNullable.group({
    profile_image: [''],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    is_admin: [false],
    is_active: [false],
  });

  viewPass = false;
  viewRepass = false;
  formPassword = this.fb.nonNullable.group({
    password: ['', [Validators.required]],
    re_password: ['', [Validators.required, this.samePassword()]],
  });

  formNewCourse = this.fb.nonNullable.group({
    course: [0, [Validators.required]],
    role: [0, [Validators.required]],
  });

  ngOnInit(): void {
    this.loading = true;
    this.getUser();
    this.getCoursesAndRoles();
  }

  getUser() {
    this.userService.getUser(this.id).subscribe({
      next: (response) => {
        this.user = response;
        this.formInfors.patchValue(response);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.status || 500;
      },
    });
  }

  handleFormInforsSubmit() {
    if (this.formInfors.invalid) {
      this.formInfors.markAllAsTouched();
      return;
    }

    this.loadingSave = 1;
    this.userService.updateUserAdmin(this.id, this.formInfors.value).subscribe({
      next: (response) => {
        this.loadingSave = 0;
        this.user = response;
        this.formInfors.patchValue(response);
        this.notifier.notify('success', 'Usuário atualizado com sucesso!');
      },
      error: (error) => {
        this.userService.formErrorHandler(this.formInfors, error.error);
        this.loadingSave = 0;
      },
    });
  }

  handleFormPasswordSubmit() {
    if (this.formPassword.invalid) {
      this.formPassword.markAllAsTouched();
      return;
    }

    this.loadingSave = 2;
    this.userService
      .updateUserAdminPassword(this.id, this.formPassword.value)
      .subscribe({
        next: () => {
          this.loadingSave = 0;
          this.formPassword.reset();
          this.formPassword.controls.password.setErrors(null);
          this.formPassword.controls.re_password.setErrors(null);
          this.notifier.notify('success', 'Senha alterada com sucesso!');
        },
        error: (error) => {
          this.userService.formErrorHandler(this.formPassword, error.error);
          this.loadingSave = 0;
        },
      });
  }

  getCoursesAndRoles() {
    this.userService.getCoursesAndRoles().subscribe({
      next: ([courses, roles]) => {
        this.courses = courses;
        this.roles = roles;
      },
      error: (error) => {
        this.error = error.status || 500;
      },
    });
  }

  resetUserInfors() {
    this.formInfors.patchValue(this.user);
  }

  handleLinkCourseRole() {
    if (this.formNewCourse.invalid) {
      this.formNewCourse.markAllAsTouched();
      return;
    }

    this.loadingSave = 3;
    this.userService
      .linkCourseRole(this.id, this.formNewCourse.getRawValue())
      .subscribe({
        next: () => {
          this.loadingSave = 0;
          this.getUser();
          this.notifier.notify('success', 'Curso vinculado com sucesso!');
        },
        error: (error) => {
          this.userService.formErrorHandler(this.formNewCourse, error.error);
          this.loadingSave = 0;
        },
      });
  }

  resetUserPassword() {}
  resetUserPermissions() {}

  private samePassword() {
    return (control: AbstractControl) => {
      const password = control.value;
      if (password) {
        if (password !== this.formPassword.value.password) {
          return { diff_password: true };
        }
      }
      return null;
    };
  }
}
