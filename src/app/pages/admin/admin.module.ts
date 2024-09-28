import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@app/components/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, MatTableModule],
})
export class AdminModule {}
