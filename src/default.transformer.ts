import { Expose, ExposeOptions, Transform } from 'class-transformer';
import { combineDecorators } from './combine-decorators';
import { TransformerDecorator } from './transformer.decorator';

/**
 * Class transformer that set the default value **only when the value is undefined**. In order to work it will always apply the
 * `Expose({ toClassOnly: true })` although the rest of options can be modified
 * @param defaultValue The default value or a function that return the default value
 * @param options Options passed to the Expose decorator alongside `{ toClassOnly: true }`
 */
export function Default(defaultValue: any | (() => any), options?: Omit<ExposeOptions, 'toClassOnly'>): TransformerDecorator {
  const defaultIsFactory = typeof defaultValue === 'function';

  const defaultTransformerDecorator = Transform(({ value }) => {
    if (typeof value === 'undefined') {
      return defaultIsFactory ? defaultValue() : defaultValue;
    }

    return value;
  });

  return combineDecorators(Expose({ ...options, toClassOnly: true }), defaultTransformerDecorator);
}
