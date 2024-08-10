import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/components/shared/shared.module';
import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsComponent } from './exams.component';
import { ExamsDetailPropertiesComponent } from './exams-detail-properties/exams-detail-properties.component';

@NgModule({
  declarations: [ExamsComponent, ExamsDetailPropertiesComponent],
  imports: [CommonModule, ExamsRoutingModule, SharedModule, MatTabsModule],
})
export class ExamsModule {}
