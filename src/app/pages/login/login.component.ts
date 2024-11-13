import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { zoomInAnimation } from '@animations/route-animation';
import {
  ChangeRoleModalComponent,
  CONFIG,
} from '@app/components/modals/change-role-modal/change-role-modal.component';
import { ForgotPasswordComponent } from '@app/components/modals/forgot-password/forgot-password.component';
import { CookiesLoginComponent } from '@components/modals/cookies-login/cookies-login.component';
import { environment } from '@env';
import { AuthService } from '@services/auth.service';
import { BodyJson } from '@services/http.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [zoomInAnimation],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public storage: StorageService,
    private authService: AuthService,
    public router: Router
  ) {}

  loading = false;
  view_pass = false;

  version = environment.version;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  ngOnInit(): void {
    if (this.storage.token) {
      this.router.navigate(['/']);
    }
    this.awaitRemember();
  }

  loginSubmitHandler() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const body = this.form.value as BodyJson;
    this.authService.login(body).subscribe({
      next: (response) => {
        this.loading = false;
        this.authService.setToken(response.token, body['remember'] as boolean);

        if (response.user.users_course_active || response.user.is_admin) {
          this.router.navigate(['/']);
        }

        if (!response.user.users_course_active && !response.user.is_admin) {
          this.openChangeRoleModal();
        }
      },
      error: (error) => {
        this.authService.formErrorHandler(this.form, error.error);
        this.loading = false;
      },
    });
  }

  awaitRemember() {
    this.form.get('remember')?.valueChanges.subscribe((value) => {
      if (!value) return;

      if (!this.storage.cookies) {
        this.openCookieDialog();
      }
    });
  }

  openChangeRoleModal() {
    const dialogRef = this.dialog.open(ChangeRoleModalComponent, {
      ...CONFIG,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

  handleOpenForgotPasswordModal() {
    this.dialog.open(ForgotPasswordComponent, {
      data: { email: this.form.get('email')?.value },
    });
  }

  openCookieDialog() {
    const dialogRef = this.dialog.open(CookiesLoginComponent, {
      panelClass: 'cookies-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.storage.cookies = true;
      } else {
        this.form.get('remember')?.setValue(false);
      }
    });
  }
}
