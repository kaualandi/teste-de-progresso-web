import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RoleService } from '@app/services/role.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateRoleComponent>,
    private fb: FormBuilder,
    private roleService: RoleService,
    private notifier: NotifierService,
    private router: Router
  ) {
    this.dialogRef.addPanelClass('dialog-sm');
  }

  loading = false;
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
  });

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.roleService.createRole(this.form.value).subscribe({
      next: (response) => {
        this.notifier.notify('success', 'Perfil criado com sucesso');
        this.dialogRef.close(true);
        this.router.navigate(['/admin/roles', response.id]);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
