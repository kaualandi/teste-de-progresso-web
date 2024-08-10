import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/components/shared/shared.module';
import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsComponent } from './exams.component';

@NgModule({
  declarations: [ExamsComponent],
  imports: [CommonModule, ExamsRoutingModule, SharedModule, MatTabsModule],
})
export class ExamsModule {}
