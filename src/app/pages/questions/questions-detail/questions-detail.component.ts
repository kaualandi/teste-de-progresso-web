import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FROALA_OPTIONS } from '@app/constants/froala';
import { BLOOM_TAXONOMY } from '@app/constants/questions';
import { requiredRichTextValidator } from '@app/utils/validators';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-questions-detail',
  templateUrl: './questions-detail.component.html',
  styleUrls: ['./questions-detail.component.scss'],
})
export class QuestionsDetailComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  isTablet = window.innerWidth < 768;

  froalaOptions = FROALA_OPTIONS;
  bloomTaxonomy = BLOOM_TAXONOMY;
  formBody = this.fb.group({
    instruction: [''],
    support: [''],
    statement: [
      'Qual é a capital do Brasil?',
      [Validators.required, requiredRichTextValidator],
    ],
    created_at: ['2023-05-01'],
    updated_at: ['2023-05-15'],
  });

  formCorrectOption = this.fb.group({
    alternatives: this.fb.array([
      this.fb.group({
        text: ['Brasília', Validators.required],
        correct: [true],
      }),
    ]),
    explanation: ['Brasília tornou-se a capital do Brasil em 1960.'],
    reference: ['IBGE 2024'],
  });

  formDistractor = this.fb.group({
    alternatives: this.fb.array([
      this.fb.group({
        text: ['Rio de Janeiro', Validators.required],
        correct: [false],
      }),
      this.fb.group({
        text: ['São Paulo', Validators.required],
        correct: [false],
      }),
      this.fb.group({
        text: ['Belo Horizonte', Validators.required],
        correct: [false],
      }),
      this.fb.group({
        text: ['Curitiba', Validators.required],
        correct: [false],
      }),
    ]),
  });

  formFeatures = this.fb.group({
    author: ['OWN', Validators.required],
    authorship: ['UNIFESO', Validators.required],
    authorship_year: [new Date().getFullYear(), Validators.required],
    difficulty: ['easy', Validators.required],
    check_type: [1, Validators.required],
    bloom_taxonomy: ['', Validators.required],
    subject: [1, Validators.required],
    axis: ['Geografia'],
    intention: ['Fazer com que o aluno saiba a capital do Brasil.'],
    reviewer: [1, Validators.required],
  });

  ngOnInit(): void {
    this.listenerAuthor();
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
    console.log({
      ...this.formBody.getRawValue(),
      ...this.formCorrectOption.getRawValue(),
      ...this.formDistractor.getRawValue(),
      ...this.formFeatures.getRawValue(),
      alternatives: [
        ...this.formCorrectOption.controls.alternatives.getRawValue(),
        ...this.formDistractor.controls.alternatives.getRawValue(),
      ],
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
