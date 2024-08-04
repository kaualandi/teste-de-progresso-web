import { Component, Input } from '@angular/core';
import { Question } from '@app/models/question';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent {
  @Input() questions: Question[] = [];

  questionLink(question: Question) {
    if (question.status === 'draft') {
      return `${question.id}/edit`;
    }
    return `${question}/review`;
  }
}
