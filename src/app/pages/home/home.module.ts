import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HOME_ROUTES } from './home.routes';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(HOME_ROUTES)],
  declarations: [HomeComponent],
})
export class HomeModule {}
