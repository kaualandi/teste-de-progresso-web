import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmModalComponent,
  IConfirmModalData,
} from '@app/components/modals/confirm-modal/confirm-modal.component';
import { Question, ReviewMessage } from '@app/models/question';
import { QuestionService } from '@app/services/question.service';
import { StorageService } from '@app/services/storage.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-question-review',
  templateUrl: './question-review.component.html',
  styleUrls: ['./question-review.component.scss'],
})
export class QuestionReviewComponent implements OnInit {
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private notifier: NotifierService,
    private storage: StorageService
  ) {}

  id: string = this.route.snapshot.params['id'];
  user = this.storage.myself;
  loading = false;
  loadingReview = false;
  loadingReprove = false;
  loadingHistoryReview = false;
  error = 0;
  question = {} as Question;
  review = new FormControl('', Validators.required);
  reviews: ReviewMessage[] = [];
  canChangeQuestion = false;

  ngOnInit() {
    this.getQuestion();
    this.loadingHistoryReview = true;
    this.listReviewMessages();
  }

  getQuestion() {
    this.loading = true;
    this.questionService.getQuestion(this.id).subscribe({
      next: (response) => {
        this.question = response;
        this.loading = false;
        this.canChangeQuestion = response.created_by === this.user.id;
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  handleReviewFormSubmit(type?: string) {
    if (!type) {
      type = this.question.status === 'waiting_review' ? 'approve' : 'answer';
    }

    const body = {
      feedback_type: type,
      text: this.review.value,
    };

    if (type === 'request_changes') this.loadingReprove = true;
    if (type !== 'request_changes') this.loadingReview = true;
    this.questionService.createReviewMessage(this.id, body).subscribe({
      next: () => {
        this.loadingReview = false;
        this.loadingReprove = false;
        this.router.navigate(['/questions']);
        this.notifier.notify('success', 'Questão revisada com sucesso.');
      },
      error: () => {
        this.loadingReview = false;
        this.loadingReprove = false;
      },
    });
  }

  listReviewMessages() {
    this.questionService.listReviewMessages(this.id).subscribe({
      next: (response) => {
        this.reviews = response;
        this.loadingHistoryReview = false;
      },
    });
  }

  deleteQuestion() {
    this.loading = true;
    this.questionService.deleteQuestion(this.id).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/questions']);
        this.notifier.notify('success', 'Questão apagada com sucesso.');
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  handleDeleteButtonClick() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Apagar questão?',
        message: 'Essa ação não poderá ser desfeita.',
      } as IConfirmModalData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteQuestion();
      }
    });
  }

  get correctAlternative() {
    return this.question.alternatives?.find((a) => a.correct);
  }

  get distractors() {
    return this.question.alternatives?.filter((a) => !a.correct);
  }
}
