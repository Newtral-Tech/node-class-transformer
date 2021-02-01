import { Expose, Transform, TransformOptions } from 'class-transformer';
import yn from 'yn';
import { combineDecorators } from './combine-decorators';
import { TransformerDecorator } from './transformer.decorator';

/**
 * A default value can be provided due how to [this bug in class-transformer](https://github.com/typestack/class-transformer/issues/231).
 * It uses the [yn](https://www.npmjs.com/package/yn) package for transformations
 */
export function ToBoolean(options?: TransformOptions & { default?: boolean }): TransformerDecorator {
  const toBooleanDecorator: TransformerDecorator = Transform(({ value, obj, key }) => {
    // Grab the value from the object because when explicit transformation are enabled any not empty string is transformed into true
    value = obj[key];

    if (typeof value === 'undefined' && typeof options?.default !== 'undefined') {
      return options.default;
    }

    if (typeof value !== 'undefined') {
      return yn(value, { default: false });
    }

    return value;
  }, options);

  return combineDecorators(Expose(), toBooleanDecorator);
}
