import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QUESTION_STATUS_NAME, QUESTION_TABS } from '@app/constants/questions';
import {
  Question,
  QuestionFilter,
  QuestionsByTab,
  QuestionStatus,
  QuestionType,
  ReviewMessage,
} from '@app/models/question';
import { User } from '@app/models/user';
import { forkJoin } from 'rxjs';
import { BodyJson, HttpService } from './http.service';
import { StorageService } from './storage.service';
import { SubjectService } from './subject.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(
    private http: HttpService,
    private stortage: StorageService,
    private subjectService: SubjectService
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

  getSubjectsReportsAndQuestionTypes() {
    return forkJoin([
      this.subjectService.getSubjects(),
      this.http.get<User[]>('/user/'),
      this.getQuestionTypes(),
    ]);
  }

  getQuestionTypes() {
    return this.http.get<QuestionType[]>('/question-type/');
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

  registerQuestion(id: string) {
    return this.http.patch<Question>(`/question/${id}/`, {
      status: 'registered',
    });
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
        question.status === QuestionStatus.WAITING_REVIEW &&
        question.reported_by === this.user.id
      ) {
        const waitingYourReviewTab = tabsOrganized.find((t) => t.value === 5);
        waitingYourReviewTab?.questions.push(question);
        return acc;
      }

      tab.questions.push(question);
      return acc;
    }, tabsOrganized);
  }

  get questionTabsOrder(): number[] {
    const defaultValue = QUESTION_TABS.map((tab) => tab.value);
    return JSON.parse(
      localStorage.getItem(this.questionTabsOrderStorageKey) ||
        JSON.stringify(defaultValue)
    );
  }

  set questionTabsOrder(value: number[]) {
    localStorage.setItem(
      this.questionTabsOrderStorageKey,
      JSON.stringify(value)
    );
  }

  questionStatusName(question: Question) {
    return QUESTION_STATUS_NAME[question.status];
  }
}
