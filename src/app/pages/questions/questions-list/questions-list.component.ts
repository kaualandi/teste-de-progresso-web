import { Component, Input } from '@angular/core';
import { QuestionFromList } from '@app/models/question';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent {
  @Input() questions: QuestionFromList[] = [];
  @Input() canAdd = false;
}
