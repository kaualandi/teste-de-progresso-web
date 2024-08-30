import { Component, Input } from '@angular/core';
import { Question, QuestionStatus } from '@app/models/question';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent {
  @Input() questions: Question[] = [];
  @Input() canAdd = false;

  questionLink(question: Question) {
    return (
      question.id +
      (question.status === QuestionStatus.DRAFT ? '/edit/' : '/review/')
    );
  }
}
