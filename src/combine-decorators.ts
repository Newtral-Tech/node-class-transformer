import { TransformerDecorator } from './transformer.decorator';

export function combineDecorators(...decorators: TransformerDecorator[]): TransformerDecorator {
  return (...args) => decorators.forEach(decorator => decorator(...args));
}
