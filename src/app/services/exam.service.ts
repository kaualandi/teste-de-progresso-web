import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AxisService } from './axis.service';
import { QuestionService } from './question.service';
import { SubjectService } from './subject.service';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(
    private subjectService: SubjectService,
    private questionService: QuestionService,
    private axisService: AxisService
  ) {}

  getSubjectsAxisAndQuestionTypes() {
    return forkJoin([
      this.subjectService.getSubjects(),
      this.axisService.getAxes(),
      this.questionService.getQuestionTypes(),
    ]);
  }
}
