import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/components/shared/shared.module';
import { ExamsDetailPropertiesComponent } from './exams-detail-properties/exams-detail-properties.component';
import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsComponent } from './exams.component';

@NgModule({
  declarations: [ExamsComponent, ExamsDetailPropertiesComponent],
  imports: [
    CommonModule,
    ExamsRoutingModule,
    SharedModule,
    MatTabsModule,
    MatStepperModule,
    MatSelectModule,
    MatExpansionModule,
    MatSliderModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true, displayDefaultIndicatorType: false },
    },
  ],
})
export class ExamsModule {}
