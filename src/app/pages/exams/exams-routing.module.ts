import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamQuestionsDetailComponent } from './exam-questions-detail/exam-questions-detail.component';
import { ExamsDetailPropertiesComponent } from './exams-detail-properties/exams-detail-properties.component';
import { ExamsComponent } from './exams.component';

const routes: Routes = [
  {
    path: '',
    component: ExamsComponent,
  },
  {
    path: 'new',
    component: ExamsDetailPropertiesComponent,
  },
  {
    path: ':id',
    component: ExamsDetailPropertiesComponent,
  },
  {
    path: ':id/questions',
    component: ExamQuestionsDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamsRoutingModule {}
