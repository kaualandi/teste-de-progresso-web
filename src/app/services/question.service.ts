import { Injectable } from '@angular/core';
import { QUESTION_TABS } from '@app/constants/questions';
import { Question, QuestionsByTab, ReviewMessage } from '@app/models/question';
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
    return JSON.parse(
      localStorage.getItem(this.questionTabsOrderStorageKey) || '[]'
    );
  }

  set questionTabsOrder(value: string[]) {
    localStorage.setItem(
      this.questionTabsOrderStorageKey,
      JSON.stringify(value)
    );
  }
}
