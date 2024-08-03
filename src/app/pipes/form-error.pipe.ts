import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'formError',
})
export class FormErrorPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  error_prefix = 'errors.form';

  transform(value: ValidationErrors | null): string {
    if (!value) return '';
    const key = Object.keys(value)[0];
    const errorKey = this.error_prefix + '.' + key;
    if (key === 'server') return value[key];
    return this.translate.instant(errorKey);
  }
}
