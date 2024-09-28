import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@app/components/shared/shared.module';
import { CreateUserComponent } from '../../components/modals/create-user/create-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [UsersComponent, CreateUserComponent, UserDetailComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatExpansionModule,
  ],
})
export class AdminModule {}
