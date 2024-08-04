import { Component, OnInit } from '@angular/core';
import { Question, QuestionStatus } from '@app/models/question';
import { QuestionService } from '@app/services/question.service';
import { StorageService } from '@app/services/storage.service';

export type QuestionsBySection = Record<
  QuestionStatus | 'waiting_your_review',
  Question[]
>;
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  constructor(
    private questionService: QuestionService,
    private storage: StorageService
  ) {}

  loading = false;
  error = 0;
  user = this.storage.myself;

  questionsBySection: QuestionsBySection = {
    draft: [],
    waiting_your_review: [],
    waiting_review: [],
    with_requested_changes: [],
    approved: [],
    registered: [],
  };

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.loading = true;
    this.questionService.getQuestions().subscribe({
      next: (response) => {
        this.organizeQuestions(response);
        this.loading = false;
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  organizeQuestions(questions: Question[]) {
    this.questionsBySection = questions.reduce((acc, question) => {
      if (
        question.status === 'waiting_review' &&
        question.reported_by === this.user.id
      ) {
        acc.waiting_your_review.push(question);
        return acc;
      }
      acc[question.status].push(question);
      return acc;
    }, this.questionsBySection);
  }

  get questionsKeys() {
    return Object.keys(this.questionsBySection);
  }

  getQuestionBySection(section: string) {
    return this.questionsBySection[section as QuestionStatus];
  }

  getQuestionsTitlesByKey(key: string) {
    return (
      {
        waiting_your_review: 'Aguardando seu parecer',
        waiting_review: 'Aguardando parecer do revisor',
        with_requested_changes: 'Aguardando alterações',
        draft: 'Rascunhos',
        approved: 'Aprovadas',
        registered: 'Cadastradas',
        reviewed_by_you: 'Revisadas por você',
      }[key] || key
    );
  }

  getBadgeCountByKey(key: string, keyIndex: number, tabIndex: number | null) {
    if (keyIndex === tabIndex) return undefined;
    const length = this.questionsBySection[key as QuestionStatus].length;
    return length || undefined;
  }
}
