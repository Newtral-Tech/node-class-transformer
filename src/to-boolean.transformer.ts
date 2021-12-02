import { Expose, Transform, TransformOptions } from 'class-transformer';
import { combineDecorators } from './combine-decorators';
import { TransformerDecorator } from './transformer.decorator';

/**
 * A default value can be provided due how to [this bug in class-transformer](https://github.com/typestack/class-transformer/issues/231).
 * Truthy values (case in-sensitive): y, yes, true, 1, on
 * Falsy values (case in-sensitive): n, no, false, 0, off
 */
export function ToBoolean(options?: TransformOptions & { default?: boolean }): TransformerDecorator {
  const toBooleanDecorator: TransformerDecorator = Transform(({ value, obj, key }) => {
    // Grab the value from the object because when explicit transformation are enabled any not empty string is transformed into true
    value = obj[key];

    if (typeof value === 'undefined' && typeof options?.default !== 'undefined') {
      return options.default;
    }

    if (typeof value !== 'undefined') {
      return transform(value, false);
    }

    return value;
  }, options);

  return combineDecorators(Expose(), toBooleanDecorator);
}

function transform(value: string, defaultValue?: boolean) {
  if (/^(?:y|yes|true|1|on)$/i.test(value)) {
    return true;
  }

  if (/^(?:n|no|false|0|off)$/i.test(value)) {
    return false;
  }

  return defaultValue;
}
