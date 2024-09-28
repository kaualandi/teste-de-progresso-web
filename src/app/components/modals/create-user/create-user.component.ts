import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private notifier: NotifierService,
    private router: Router
  ) {
    this.dialogRef.addPanelClass('dialog-sm');
  }

  loading = false;
  viewPass = false;
  viewRepass = false;
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    re_password: ['', [Validators.required, this.samePassword()]],
    is_admin: [false],
  });

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.userService.createUser(this.form.value).subscribe({
      next: (response) => {
        this.notifier.notify('success', 'Usuário criado com sucesso');
        this.dialogRef.close(true);
        this.router.navigate(['/admin/users', response.id]);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  private samePassword() {
    return (control: AbstractControl) => {
      const password = control.value;
      if (password) {
        if (password !== this.form.value.password) {
          return { diff_password: true };
        }
      }
      return null;
    };
  }
}
