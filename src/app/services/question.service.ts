import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QUESTION_TABS } from '@app/constants/questions';
import {
  Question,
  QuestionFilter,
  QuestionsByTab,
  ReviewMessage,
} from '@app/models/question';
import { Subject } from '@app/models/subject';
import { User } from '@app/models/user';
import { forkJoin } from 'rxjs';
import { BodyJson, HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(
    private http: HttpService,
    private stortage: StorageService
  ) {}

  user = this.stortage.myself;

  questionTabsOrderStorageKey = 'questionTabsOrder';
  formErrorHandler = this.http.formErrorHandler;

  getMyQuestions(filters?: QuestionFilter) {
    let query = new HttpParams();
    if (filters) {
      query = query
        .append('start_year', filters.start_year)
        .append('end_year', filters.end_year)
        .append('authorship', filters.authorship.join(','))
        .append('subjects', filters.subjects.join(','))
        .append('order_by', filters.order_by);
    }

    return this.http.get<Question[]>('/question/my_questions', query);
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

  organizeQuestions(questions: Question[]): QuestionsByTab[] {
    const tabsOrganized = this.questionTabsOrder.map((tab) => {
      const tabObj = QUESTION_TABS.find((t) => t.value === tab);
      return {
        ...tabObj!,
        questions: [] as Question[],
      };
    });

    return questions.reduce((acc, question) => {
      const tab = tabsOrganized.find((t) => t.value === question.status);
      if (!tab) return acc;

      if (
        question.status === 'waiting_review' &&
        question.reported_by === this.user.id
      ) {
        const waitingYourReviewTab = tabsOrganized.find(
          (t) => t.value === 'waiting_your_review'
        );
        waitingYourReviewTab?.questions.push(question);
        return acc;
      }

      tab.questions.push(question);
      return acc;
    }, tabsOrganized);
  }

  get questionTabsOrder(): string[] {
    const defaultValue = QUESTION_TABS.map((tab) => tab.value);
    return JSON.parse(
      localStorage.getItem(this.questionTabsOrderStorageKey) ||
        JSON.stringify(defaultValue)
    );
  }

  set questionTabsOrder(value: string[]) {
    localStorage.setItem(
      this.questionTabsOrderStorageKey,
      JSON.stringify(value)
    );
  }
}
