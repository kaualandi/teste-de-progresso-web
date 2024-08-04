import { Pipe, PipeTransform } from '@angular/core';
import { BLOOM_TAXONOMY } from '@app/constants/questions';
import { BloomTaxonomy } from '@app/models/question';

@Pipe({
  name: 'bloomTaxonomy',
})
export class BloomTaxonomyPipe implements PipeTransform {
  transform(value: BloomTaxonomy) {
    return BLOOM_TAXONOMY.find((t) => t.value === value)?.label || '';
  }
}
