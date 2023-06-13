import { CompressorService } from '../services/compressor.service';
import { InputFileDirective } from './input-file.directive';

describe('InputFileDirective', () => {
  it('should create an instance', () => {
    const directive = new InputFileDirective(CompressorService as any);
    expect(directive).toBeTruthy();
  });
});
