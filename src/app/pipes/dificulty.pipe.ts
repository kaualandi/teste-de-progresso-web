import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficulty',
})
export class Difficulty implements PipeTransform {
  transform(value: string) {
    if (value === 'EASY') return 'Fácil';
    if (value === 'MEDIUM') return 'Médio';
    if (value === 'HARD') return 'Difícil';
    return '';
  }
}
