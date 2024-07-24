import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plaintext',
})
export class PlaintextPipe implements PipeTransform {
  transform(value?: null | string): string {
    if (!value) return '';
    return value.replace(/<[^>]*>/g, '');
  }
}
