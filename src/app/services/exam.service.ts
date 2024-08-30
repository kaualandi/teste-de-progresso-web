import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { QuestionService } from './question.service';
import { SubjectService } from './subject.service';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(
    private subjectService: SubjectService,
    private questionService: QuestionService
  ) {}

  getSubjectsAxisAndQuestionTypes() {
    return forkJoin([
      this.subjectService.getSubjects(),
      this.subjectService.getAxis(),
      this.questionService.getQuestionTypes(),
    ]);
  }
}
