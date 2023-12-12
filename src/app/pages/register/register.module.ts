import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
})
export class RegisterModule {}
