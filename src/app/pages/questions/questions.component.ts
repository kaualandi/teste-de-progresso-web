import { Component, OnInit } from '@angular/core';
import { QuestionFilter, QuestionsByTab } from '@app/models/question';
import { QuestionService } from '@app/services/question.service';
import { StorageService } from '@app/services/storage.service';
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
  filtering = false;
  error = 0;
  user = this.storage.myself;
  questions: QuestionsByTab[] = [];

  ngOnInit() {
    this.loading = true;
    this.getQuestions();
  }

  getQuestions(form?: QuestionFilter) {
    if (form) this.filtering = true;
    this.questionService.getMyQuestions(form).subscribe({
      next: (response) => {
        this.questions = this.questionService.organizeQuestions(response);
        this.loading = false;
        this.filtering = false;
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
        this.filtering = false;
      },
    });
  }

  getBadgeCount(
    questionsTab: QuestionsByTab,
    keyIndex: number,
    tabIndex: number | null
  ) {
    if (keyIndex === tabIndex) return undefined;
    const length = questionsTab.questions.length;
    return length || undefined;
  }
}
