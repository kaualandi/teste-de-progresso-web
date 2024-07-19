import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dificulty',
})
export class DificultyPipe implements PipeTransform {
  transform(value: string) {
    if (value === 'easy') return 'Fácil';
    if (value === 'medium') return 'Médio';
    if (value === 'hard') return 'Difícil';
    return '';
  }
}
