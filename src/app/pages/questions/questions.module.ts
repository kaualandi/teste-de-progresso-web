import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '@app/components/shared/shared.module';
import { QuestionsDetailComponent } from './questions-detail/questions-detail.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';

@NgModule({
  declarations: [QuestionsComponent, QuestionsDetailComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,
    MatStepperModule,
  ],
})
export class QuestionsModule {}
