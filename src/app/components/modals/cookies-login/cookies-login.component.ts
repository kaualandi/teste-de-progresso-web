import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cookies-login',
  templateUrl: './cookies-login.component.html',
  styleUrls: ['./cookies-login.component.scss'],
})
export class CookiesLoginComponent {
  constructor(public dialogRef: MatDialogRef<CookiesLoginComponent>) {}

  closeDialog(accept: boolean) {
    this.dialogRef.close(accept);
  }
}
