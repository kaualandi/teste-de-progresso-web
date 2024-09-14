import { Pipe, PipeTransform } from '@angular/core';
import { QUESTION_DIFFICULTIES } from '@app/constants/questions';
import { QuestionDifficulty } from '@app/models/question';

@Pipe({
  name: 'difficulty',
})
export class DifficultyPipe implements PipeTransform {
  transform(value: QuestionDifficulty) {
    return QUESTION_DIFFICULTIES.find((d) => d.value === value)?.label || '';
  }
}
