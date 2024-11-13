import { Pipe, PipeTransform } from '@angular/core';
import { FEEDBACK_TYPES } from '@app/constants/questions';
import { ReviewFeedbackType } from '@app/models/question';

@Pipe({
  name: 'reviewStatus',
})
export class ReviewStatusPipe implements PipeTransform {
  transform(value?: ReviewFeedbackType) {
    return FEEDBACK_TYPES.find((t) => t.value === value)?.label || '';
  }
}
