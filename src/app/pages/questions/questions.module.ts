import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '@app/components/shared/shared.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { QuestionsDetailComponent } from './questions-detail/questions-detail.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import 'froala-editor/js/languages/pt_br.js';

@NgModule({
  declarations: [QuestionsComponent, QuestionsDetailComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true, displayDefaultIndicatorType: false },
    },
  ],
})
export class QuestionsModule {}
