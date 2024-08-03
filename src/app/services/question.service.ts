import { Injectable } from '@angular/core';
import { Question } from '@app/models/question';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpService) {}
  formErrorHandler = this.http.formErrorHandler;

  getQuestions() {
    return this.http.get<Question[]>('/questions/');
  }
}
