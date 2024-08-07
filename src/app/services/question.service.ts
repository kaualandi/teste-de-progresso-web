import { Injectable } from '@angular/core';
import { Question, ReviewMessage } from '@app/models/question';
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
    return this.http.get<Question[]>('/question/');
  }

  getQuestion(id: string) {
    return this.http.get<Question>(`/question/${id}`);
  }

  createQuestion(body: BodyJson) {
    return this.http.post<Question>('/question/', body);
  }

  updateQuestion(id: string, body: BodyJson) {
    return this.http.patch<Question>(`/question/${id}/`, body);
  }

  deleteQuestion(id: string) {
    return this.http.delete(`/question/${id}`);
  }

  getSubjectsAndReports() {
    return forkJoin([
      this.http.get<Subject[]>('/subject/'),
      this.http.get<User[]>('/user/'),
    ]);
  }

  createReviewMessage(id: string, body: BodyJson) {
    return this.http.post<ReviewMessage>(
      `/question/${id}/create_review_message/`,
      body
    );
  }

  listReviewMessages(id: string) {
    return this.http.get<ReviewMessage[]>(
      `/question/${id}/list_review_message/`
    );
  }
}
