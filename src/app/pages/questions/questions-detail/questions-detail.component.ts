import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmModalComponent,
  IConfirmModalData,
} from '@app/components/modals/confirm-modal/confirm-modal.component';
import {
  BLOOM_TAXONOMY,
  QUESTION_DIFFICULTIES,
} from '@app/constants/questions';
import { QuestionStatus, QuestionType } from '@app/models/question';
import { Subject } from '@app/models/subject';
import { User } from '@app/models/user';
import { PlaintextPipe } from '@app/pipes/plaintext.pipe';
import { CkeditorService } from '@app/services/ckeditor.service';
import { BodyJson } from '@app/services/http.service';
import { QuestionService } from '@app/services/question.service';
import { requiredRichTextValidator } from '@app/utils/validators';
import { NotifierService } from 'angular-notifier';
import { ClassicEditor } from 'ckeditor5';
import { startWith } from 'rxjs';

type LoadingActions = 'submit' | 'draft' | 'delete';
@Component({
  selector: 'app-questions-detail',
  templateUrl: './questions-detail.component.html',
  styleUrls: ['./questions-detail.component.scss'],
})
export class QuestionsDetailComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private dialog: MatDialog,
    private plainTextPipe: PlaintextPipe,
    private ckeditor: CkeditorService
  ) {}

  id: string = this.route.snapshot.params['id'];
  isTablet = window.innerWidth < 768;

  loading = false;
  error = 0;
  loadingActions?: LoadingActions;
  public ckEditor = ClassicEditor;
  ckEditorConfig = this.ckeditor.config;
  difficultyOptions = QUESTION_DIFFICULTIES;
  bloomTaxonomy = BLOOM_TAXONOMY;
  questionTypes: QuestionType[] = [];
  subjects: Subject[] = [];
  reports: User[] = [];
  status?: QuestionStatus;
  QuestionStatus = QuestionStatus;

  formBody = this.fb.group({
    instruction: [''],
    support: [''],
    body: ['<p></p>', [Validators.required, requiredRichTextValidator]],
  });

  formCorrectOption = this.fb.group({
    alternatives: this.fb.array([
      this.fb.group({
        text: ['', Validators.required],
        correct: [true],
      }),
    ]),
    explanation: [''],
    references: [''],
  });

  formDistractor = this.fb.group({
    alternatives: this.fb.array([
      this.fb.group({
        text: ['', Validators.required],
        correct: [false],
      }),
      this.fb.group({
        text: ['', Validators.required],
        correct: [false],
      }),
      this.fb.group({
        text: ['', Validators.required],
        correct: [false],
      }),
      this.fb.group({
        text: ['', Validators.required],
        correct: [false],
      }),
    ]),
  });

  formFeatures = this.fb.group({
    author: ['OWN', Validators.required],
    authorship: ['UNIFESO', Validators.required],
    authorship_year: [new Date().getFullYear() + '', Validators.required],
    difficulty: [0, Validators.required],
    question_type: [0, Validators.required],
    bloom_taxonomy: [0, Validators.required],
    subject: [0, Validators.required],
    axis: [''],
    intention: [''],
    reported_by: [0, Validators.required],
  });

  ngOnInit(): void {
    this.formFeatures.patchValue({
      reported_by: null,
      subject: null,
      question_type: null,
    });
    this.listenerAuthor();
    this.listenerSubject();
    this.getSubjectsReportsAndQuestionTypes();
  }

  listenerAuthor() {
    this.formFeatures
      .get('author')
      ?.valueChanges.pipe(startWith('OWN'))
      .subscribe((author) => {
        const { authorship, authorship_year } = this.formFeatures.controls;
        if (author === 'OWN') {
          authorship.setValue('UNIFESO', { emitEvent: false });
          authorship_year.setValue(new Date().getFullYear() + '', {
            emitEvent: false,
          });
          authorship.disable({ emitEvent: false });
          authorship_year.disable({ emitEvent: false });
          return;
        }

        authorship.enable({ emitEvent: false });
        authorship_year.enable({ emitEvent: false });
      });
  }

  listenerSubject() {
    this.formFeatures.get('subject')?.valueChanges.subscribe((subjectId) => {
      const subject = this.subjects.find((subject) => subject.id === subjectId);
      this.formFeatures.controls.axis.setValue(
        subject?.axis_instance?.name || '',
        {
          emitEvent: false,
        }
      );
    });
  }

  handleFormSubmit(draft = false) {
    if (
      !draft &&
      (this.formBody.invalid ||
        this.formCorrectOption.invalid ||
        this.formDistractor.invalid ||
        this.formFeatures.invalid)
    ) {
      this.formBody.markAllAsTouched();
      this.formCorrectOption.markAllAsTouched();
      this.formDistractor.markAllAsTouched();
      this.formFeatures.markAllAsTouched();
      this.notifier.notify('error', 'Preencha todos os campos obrigatórios!');
      return;
    }

    const status: QuestionStatus = draft
      ? QuestionStatus.DRAFT
      : QuestionStatus.WAITING_REVIEW;

    const body = {
      ...this.formBody.getRawValue(),
      ...this.formCorrectOption.getRawValue(),
      ...this.formDistractor.getRawValue(),
      ...this.formFeatures.getRawValue(),
      alternatives: [
        ...this.formCorrectOption.controls.alternatives.getRawValue(),
        ...this.formDistractor.controls.alternatives.getRawValue(),
      ],
      status,
    } as BodyJson;

    this.loadingActions = draft ? 'draft' : 'submit';
    const observable = this.id
      ? this.questionService.updateQuestion(this.id, body)
      : this.questionService.createQuestion(body);

    observable.subscribe({
      next: (question) => {
        console.log(question);
        this.router.navigate(['/questions']);
        this.notifier.notify(
          'success',
          `Questão ${this.id ? 'atualizada' : 'cadastrada'} com sucesso!`
        );
      },
      error: (error) => {
        console.error(error);
        this.loadingActions = undefined;
      },
    });
  }

  getQuestion() {
    this.loading = true;
    this.questionService.getQuestion(this.id).subscribe({
      next: (question) => {
        this.status = question.status;
        this.formBody.patchValue({
          instruction: question.instruction,
          support: question.support,
          body: question.body,
        });

        this.formCorrectOption.patchValue({
          alternatives: question.alternatives.filter(
            (alternative) => alternative.correct
          ),
          explanation: question.explanation,
          references: question.references,
        });

        this.formDistractor.patchValue({
          alternatives: question.alternatives.filter(
            (alternative) => !alternative.correct
          ),
        });

        this.formFeatures.patchValue({
          ...question,
          author: question.authorship === 'UNIFESO' ? 'OWN' : 'OTHER',
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  deleteQuestion() {
    this.loadingActions = 'delete';
    this.questionService.deleteQuestion(this.id).subscribe({
      next: () => {
        this.router.navigate(['/questions']);
        this.notifier.notify('success', 'Questão apagada com sucesso.');
      },
      error: () => {
        this.loadingActions = undefined;
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

  getSubjectsReportsAndQuestionTypes() {
    this.loading = true;
    this.questionService.getSubjectsReportsAndQuestionTypes().subscribe({
      next: ([subjects, reports, questionTypes]) => {
        this.subjects = subjects;
        this.reports = reports;
        this.questionTypes = questionTypes;
        if (!this.id) {
          this.loading = false;
          return;
        }
        this.getQuestion();
      },
      error: (error) => {
        this.error = error.status || 500;
        this.loading = false;
      },
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isTablet = window.innerWidth < 768;
  }

  get correctAlternative() {
    return this.formCorrectOption.controls.alternatives.controls[0].controls
      .text;
  }

  get distractorAlternatives() {
    return this.formDistractor.controls.alternatives.controls;
  }

  get headerTitle() {
    let title = '';
    if (this.id) title += `#${this.id} `;
    title += this.plainTextPipe.transform(this.formBody.value.body) || '&nbsp;';
    return title;
  }
}
