import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private notifier: NotifierService
  ) {}

  isTablet = window.innerWidth < 768;

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
    authorship_year: [new Date().getFullYear(), Validators.required],
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
          authorship_year.setValue(new Date().getFullYear(), {
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

  handleFormSubmit() {
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
    this.questionService.createQuestion(body).subscribe({
      next: (question) => {
        console.log(question);
        this.router.navigate(['/questions']);
        this.notifier.notify('success', 'Questão cadastrada com sucesso!');
      },
      error: (error) => {
        console.error(error);
        this.loadingSubmit = false;
      },
    });
  }

  getSubjectsAndReports() {
    this.questionService.getSubjectsAndReports().subscribe({
      next: ([subjects, reports]) => {
        this.subjects = subjects;
        this.reports = reports;
      },
      error: (error) => {
        console.error(error);
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
