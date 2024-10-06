import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '@app/models/user';
import { AxisService } from '@app/services/axis.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-axis',
  templateUrl: './create-axis.component.html',
  styleUrls: ['./create-axis.component.scss'],
})
export class CreateAxisComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateAxisComponent>,
    private fb: FormBuilder,
    private axisService: AxisService,
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
  });

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.axisService.createAxis(this.form.value).subscribe({
      next: (response) => {
        this.notifier.notify('success', 'Eixo criado com sucesso');
        this.dialogRef.close(true);
        this.router.navigate(['/admin/axes', response.id]);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
