import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionReviewComponent } from './question-review/question-review.component';
import { QuestionsDetailComponent } from './questions-detail/questions-detail.component';
import { QuestionsComponent } from './questions.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent,
  },
  {
    path: 'new',
    component: QuestionsDetailComponent,
  },
  {
    path: ':id/edit',
    component: QuestionsDetailComponent,
  },
  {
    path: ':id/review',
    component: QuestionReviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
