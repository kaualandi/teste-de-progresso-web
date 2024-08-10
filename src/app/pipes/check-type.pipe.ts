import { Pipe, PipeTransform } from '@angular/core';
import { CHECK_TYPES } from '@app/constants/questions';
import { QuestionCheckType } from '@app/models/question';

@Pipe({
  name: 'checkType',
})
export class CheckTypePipe implements PipeTransform {
  transform(value: QuestionCheckType | string) {
    return CHECK_TYPES.find((d) => d.value === value)?.label || '';
  }
}
