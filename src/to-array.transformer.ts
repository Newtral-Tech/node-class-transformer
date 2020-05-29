import { Transform } from 'class-transformer';
import { TransformerDecorator } from './transformer.decorator';

/**
 * Transform the property into an array.
 * When the value is undefined there is not action.
 * When the value is not an array it gets transformer into an array of one element.
 * This could be useful when obtaining multiple query string values but the user only selects one item.
 */
export function ToArray(): TransformerDecorator {
  return Transform((value: unknown) => {
    if (typeof value !== 'undefined' && !Array.isArray(value)) {
      return [value];
    }

    return value;
  });
}
