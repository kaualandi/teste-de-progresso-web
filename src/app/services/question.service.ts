import { Injectable } from '@angular/core';
import { Question } from '@app/models/question';
import { Subject } from '@app/models/subject';
import { User } from '@app/models/user';
import { forkJoin } from 'rxjs';
import { BodyJson, HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpService) {}
  formErrorHandler = this.http.formErrorHandler;

  getQuestions() {
    return this.http.get<Question[]>('/questions/');
  }

  createQuestion(body: BodyJson) {
    return this.http.post<Question>('/questions/', body);
  }

  getSubjectsAndReports() {
    return forkJoin([
      this.http.get<Subject[]>('/subjects/'),
      this.http.get<User[]>('/user/'),
    ]);
  }
}
