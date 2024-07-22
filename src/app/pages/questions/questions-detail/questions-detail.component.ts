import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-questions-detail',
  templateUrl: './questions-detail.component.html',
  styleUrls: ['./questions-detail.component.scss'],
})
export class QuestionsDetailComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    id: [1],
    instruction: [''],
    statement: ['Qual é a capital do Brasil?'],
    difficulty: ['medium'],
    subject: ['Geografia'],
    created_by: ['João Silva'],
    reviewer: ['Maria Oliveira'],
    created_at: ['2023-05-01'],
    updated_at: ['2023-05-15'],
  });
}
