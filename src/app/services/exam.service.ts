import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SubjectService } from './subject.service';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private subjectService: SubjectService) {}

  getSubjectsAndAxis() {
    return forkJoin([
      this.subjectService.getSubjects(),
      this.subjectService.getAxis(),
    ]);
  }
}
