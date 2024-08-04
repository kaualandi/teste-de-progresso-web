import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FROALA_OPTIONS } from '@app/constants/froala';
import { BLOOM_TAXONOMY, CHECK_TYPES } from '@app/constants/questions';
import { Subject } from '@app/models/subject';
import { User } from '@app/models/user';
import { BodyJson } from '@app/services/http.service';
import { QuestionService } from '@app/services/question.service';
import { requiredRichTextValidator } from '@app/utils/validators';
import { NotifierService } from 'angular-notifier';
import { startWith } from 'rxjs';

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
    private notifier: NotifierService
  ) {}

  id: string = this.route.snapshot.params['id'];
  isTablet = window.innerWidth < 768;

  loading = false;
  error = 0;
  loadingSubmit = false;
  froalaOptions = FROALA_OPTIONS;
  bloomTaxonomy = BLOOM_TAXONOMY;
  checkTypes = CHECK_TYPES;
  subjects: Subject[] = [];
  reports: User[] = [];

  formBody = this.fb.group({
    instruction: [''],
    support: [''],
    body: ['', [Validators.required, requiredRichTextValidator]],
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
    difficulty: ['', Validators.required],
    check_type: ['', Validators.required],
    bloom_taxonomy: ['', Validators.required],
    subject: [0, Validators.required],
    axis: [''],
    intention: [''],
    reported_by: [0, Validators.required],
  });

  ngOnInit(): void {
    this.listenerAuthor();
    this.listenerSubject();
    this.getSubjectsAndReports();
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
      if (!subject) return;

      this.formFeatures.controls.axis.setValue(subject.axis_obj.name, {
        emitEvent: false,
      });
    });
  }

  handleFormSubmit() {
    if (
      this.formBody.invalid ||
      this.formCorrectOption.invalid ||
      this.formDistractor.invalid ||
      this.formFeatures.invalid
    ) {
      this.formBody.markAllAsTouched();
      this.formCorrectOption.markAllAsTouched();
      this.formDistractor.markAllAsTouched();
      this.formFeatures.markAllAsTouched();
      return;
    }

    const body = {
      ...this.formBody.getRawValue(),
      ...this.formCorrectOption.getRawValue(),
      ...this.formDistractor.getRawValue(),
      ...this.formFeatures.getRawValue(),
      alternatives: [
        ...this.formCorrectOption.controls.alternatives.getRawValue(),
        ...this.formDistractor.controls.alternatives.getRawValue(),
      ],
    } as BodyJson;

    this.loadingSubmit = true;
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
        this.loadingSubmit = false;
      },
    });
  }

  getQuestion() {
    this.loading = true;
    this.questionService.getQuestion(this.id).subscribe({
      next: (question) => {
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

  getSubjectsAndReports() {
    this.loading = true;
    this.questionService.getSubjectsAndReports().subscribe({
      next: ([subjects, reports]) => {
        this.subjects = subjects;
        this.reports = reports;
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
}
