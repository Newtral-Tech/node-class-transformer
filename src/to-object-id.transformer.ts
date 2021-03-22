import { ObjectId } from 'bson';
import { Transform, TransformationType } from 'class-transformer';
import { TransformerDecorator } from './transformer.decorator';

export interface ToObjectIdOptions {
  /** Set to true to indicate the property is an array of object ids */
  each?: boolean;
}

/**
 * Transform an object id value to string an vice versa using the following conventions:
 * * It will do nothing if the value is undefined
 * * plain to class or class to class: If the object is a string it uses new ObjectId(value)
 * * class to plain: converts the object id to it string representation
 */
export function ToObjectId(options?: ToObjectIdOptions): TransformerDecorator {
  return Transform(({ value, obj, type, key }) => {
    // Try to get the value from the original object first because the deep clone mechanism does not correctly clone object ids objects
    // https://github.com/typestack/class-transformer/issues/494
    value = obj[key] ?? value;

    if (options?.each && Array.isArray(value)) {
      return value.map(id => toObjectId(id, type));
    }

    return toObjectId(value, type);
  });
}

function toObjectId(value: undefined | null | ObjectId | string, type: TransformationType) {
  if (value == null) {
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
}
