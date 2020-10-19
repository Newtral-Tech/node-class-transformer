import { ObjectId } from 'bson';
import { Transform, TransformationType } from 'class-transformer';
import { TransformerDecorator } from './transformer.decorator';

/**
 * Transform an object id value to string an vice versa using the following conventions:
 * * It will do nothing if the value is undefined
 * * plain to class or class to class: If the object is a string it uses new ObjectId(value)
 * * class to plain: converts the object id to it string representation
 */
export function ToObjectId(): TransformerDecorator {
  return (target, property) => {
    Transform((value: ObjectId | string, obj, type) => {
      // Try to get the value from the original object first because the deep clone mechanism does not correctly clone object ids objects
      // https://github.com/typestack/class-transformer/issues/494
      value = obj[property] ?? value;

      if (typeof value === 'undefined') {
        return value;
      }

      if (type === TransformationType.PLAIN_TO_CLASS || type === TransformationType.CLASS_TO_CLASS) {
        try {
          return new ObjectId(value);
        } catch {
          return value;
        }
      }

      return String(value);
    })(target, property);
  };
}
