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
  return Transform((value: ObjectId | string, obj, type) => {
    if (typeof value === 'undefined') {
      return value;
    }

    if (type === TransformationType.PLAIN_TO_CLASS || type === TransformationType.CLASS_TO_CLASS) {
      try {
        return typeof value === 'string' ? new ObjectId(value) : value;
      } catch {
        return value;
      }
    }

    return String(value);
  });
}
