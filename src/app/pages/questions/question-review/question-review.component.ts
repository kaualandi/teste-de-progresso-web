import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmModalComponent,
  IConfirmModalData,
} from '@app/components/modals/confirm-modal/confirm-modal.component';
import {
  Question,
  QuestionStatus,
  ReviewFeedbackType,
  ReviewMessage,
} from '@app/models/question';
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
  title = '';
  loading = false;
  loadingSubmit = false;
  loadingHistoryReview = false;
  error = 0;
  question = {} as Question;
  review = new FormControl('', Validators.required);
  approveStatus = new FormControl(ReviewFeedbackType.ANSWER, {
    nonNullable: true,
  });

  reviews: ReviewMessage[] = [];
  canChangeQuestion = false;
  canSendReview = false;
  questionStatus = QuestionStatus;

  ngOnInit() {
    this.getQuestion();
    this.loadingHistoryReview = true;
    this.listReviewMessages();

    this.canSendReview = false;
    this.approveStatus.disable();
    this.review.disable();
  }

  getQuestion() {
    this.loading = true;
    this.questionService.getQuestion(this.id).subscribe({
      next: (response) => {
        this.question = response;
        this.setQuestionTitle();
        if (
          (response.status === QuestionStatus.WAITING_REVIEW &&
            response.reported_by === this.user.id) ||
          (response.status === QuestionStatus.WITH_REQUESTED_CHANGES &&
            response.created_by === this.user.id)
        ) {
          this.disableReviewActions();
        }

        if (
          (response.created_by === this.user.id &&
            ![QuestionStatus.REGISTERED].includes(response.status)) ||
          (response.status === QuestionStatus.WAITING_REVIEW &&
            response.reported_by === this.user.id)
        ) {
          this.canChangeQuestion = true;
        }

        this.loading = false;
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  handleReviewFormSubmit() {
    let type = ReviewFeedbackType.ANSWER;
    if (this.question.status === QuestionStatus.WAITING_REVIEW) {
      type = this.approveStatus.value;
    }

    const body = {
      feedback_type: type,
      text: this.review.value,
    };

    this.loadingSubmit = true;

    this.questionService.createReviewMessage(this.id, body).subscribe({
      next: () => {
        this.loadingSubmit = false;
        this.router.navigate(['/questions']);
        this.notifier.notify('success', 'Questão revisada com sucesso.');
      },
      error: () => {
        this.loadingSubmit = false;
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

  registerQuestion() {
    this.loadingSubmit = true;

    this.questionService.registerQuestion(this.id).subscribe({
      next: () => {
        this.loadingSubmit = false;
        this.notifier.notify('success', 'Questão registrada com sucesso.');
        this.router.navigate(['/questions']);
      },
      error: () => {
        this.loadingSubmit = false;
      },
    });
  }

  disableReviewActions() {
    this.canSendReview = true;
    this.approveStatus.enable();
    this.approveStatus.setValue(ReviewFeedbackType.APPROVE);
    this.review.enable();
  }

  setQuestionTitle() {
    this.title = this.questionService.questionStatusName(this.question);
  }

  get correctAlternative() {
    return this.question.alternatives?.find((a) => a.correct);
  }

  get distractors() {
    return this.question.alternatives?.filter((a) => !a.correct);
  }
}
