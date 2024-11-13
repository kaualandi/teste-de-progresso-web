import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  QuestionFilter,
  QuestionsByTab,
  QuestionStatus,
} from '@app/models/question';
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
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loading = false;
  filtering = false;
  error = 0;
  user = this.storage.myself;
  questions: QuestionsByTab[] = [];
  QuestionStatus = QuestionStatus;
  selectedIndex = 0;

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

        const routerTabIndex = this.route.snapshot.queryParams['tab'];
        if (routerTabIndex) {
          this.selectedIndex = +routerTabIndex;
        }
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

  selectedIndexChange(index: number) {
    this.selectedIndex = index;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: index },
      queryParamsHandling: 'merge',
    });
  }
}
