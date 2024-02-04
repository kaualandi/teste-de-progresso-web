import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { zoomInAnimation } from '@animations/route-animation';
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

  login_form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  ngOnInit(): void {
    this.awaitRemember();
  }

  loginSubmitHandler() {
    if (this.login_form.invalid) {
      this.login_form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const body = this.login_form.value as BodyJson;
    this.authService.login(body).subscribe({
      next: (response) => {
        this.loading = false;
        this.authService.setToken(response.token, body['remember'] as boolean);
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  awaitRemember() {
    this.login_form.get('remember')?.valueChanges.subscribe((value) => {
      if (!value) return;

      if (!this.storage.cookies) {
        this.openCookieDialog();
      }
    });
  }

  handleOpenForgotPasswordModal() {
    this.dialog.open(ForgotPasswordComponent, {
      data: { email: this.login_form.get('email')?.value },
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
        this.login_form.get('remember')?.setValue(false);
      }
    });
  }
}
