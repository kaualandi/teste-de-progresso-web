import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FROALA_OPTIONS } from '@app/constants/froala';
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
  formBody = this.fb.group({
    id: [1],
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
    id: [1],
    correct_option: ['Brasília', Validators.required],
    explanation: ['Brasília tornou-se a capital do Brasil em 1960.'],
    reference: ['IBGE 2024'],
  });

  formDistractor = this.fb.group({
    distractor_one: ['Rio de Janeiro', Validators.required],
    distractor_two: ['São Paulo', Validators.required],
    distractor_three: ['Belo Horizonte', Validators.required],
    distractor_four: ['Curitiba', Validators.required],
  });

  formFeatures = this.fb.group({
    author: ['OWN', Validators.required],
    source: ['UNIFESO', Validators.required],
    year: [new Date().getFullYear(), Validators.required],
    difficulty: ['EASY', Validators.required],
    type: [1, Validators.required],
    cognitive_ability: [1, Validators.required],
    subject: [1, Validators.required],
    training_axis: ['Geografia'],
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
        const { source, year } = this.formFeatures.controls;
        if (author === 'OWN') {
          source.setValue('UNIFESO', { emitEvent: false });
          year.setValue(new Date().getFullYear(), { emitEvent: false });
          source.disable({ emitEvent: false });
          year.disable({ emitEvent: false });
          return;
        }

        source.enable({ emitEvent: false });
        year.enable({ emitEvent: false });
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isTablet = window.innerWidth < 768;
  }
}
