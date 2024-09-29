import { Pipe, PipeTransform } from '@angular/core';
import { ROLE_DICTIONARY } from './../constants/role';

@Pipe({
  name: 'roleDict',
})
export class RoleDictPipe implements PipeTransform {
  transform(value: string) {
    return ROLE_DICTIONARY[value as keyof typeof ROLE_DICTIONARY] || value;
  }
}
