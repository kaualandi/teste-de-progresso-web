import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LOGIN_ROUTES } from './login.routes';

import { CookiesLoginComponent } from 'src/app/components/modals/cookies-login/cookies-login.component';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    RouterModule.forChild(LOGIN_ROUTES),
  ],
  declarations: [LoginComponent, CookiesLoginComponent],
})
export class LoginModule {}
