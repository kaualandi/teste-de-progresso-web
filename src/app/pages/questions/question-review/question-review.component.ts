import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmModalComponent,
  IConfirmModalData,
} from '@app/components/modals/confirm-modal/confirm-modal.component';
import { Question } from '@app/models/question';
import { QuestionService } from '@app/services/question.service';
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
    private notifier: NotifierService
  ) {}

  id: string = this.route.snapshot.params['id'];
  loading = false;
  loadingReview = false;
  error = 0;
  question = {} as Question;
  review = new FormControl('', Validators.required);

  ngOnInit() {
    this.getQuestion();
  }

  getQuestion() {
    this.loading = true;
    this.questionService.getQuestion(this.id).subscribe({
      next: (response) => {
        this.question = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
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
