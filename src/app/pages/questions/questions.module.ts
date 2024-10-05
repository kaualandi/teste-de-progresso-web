import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/components/shared/shared.module';
import { PlaintextPipe } from '@app/pipes/plaintext.pipe';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/languages/pt_br.js';
import { QuestionReviewComponent } from './question-review/question-review.component';
import { QuestionsDetailComponent } from './questions-detail/questions-detail.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionsDetailComponent,
    QuestionsListComponent,
    QuestionReviewComponent,
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule,
    MatExpansionModule,
    MatRippleModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true, displayDefaultIndicatorType: false },
    },
    PlaintextPipe,
  ],
})
export class QuestionsModule {}
