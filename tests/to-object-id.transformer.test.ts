// eslint-disable-next-line max-classes-per-file
import { ToObjectId } from '@newtral/class-transformer';
import { ObjectId } from 'bson';
import { expect } from 'chai';
import { classToClass, classToPlain, plainToClass } from 'class-transformer';
import faker from 'faker';

describe('@ToObjectId()', () => {
  context('classToPlain()', () => {
    it('should transform an object id into a string', () => {
      class Test {
        @ToObjectId()
        test!: ObjectId;
      }

      const test = new Test();
      test.test = new ObjectId();

      const plain = classToPlain(test) as Partial<Test>;

      expect(plain.test).to.be.equal(test.test.toHexString());
    });
  });

  context('classToClass()', () => {
    it('should transform a string into an object id', () => {
      class Test {
        @ToObjectId()
        test!: ObjectId;
      }

      const test = new Test();
      test.test = new ObjectId().toHexString() as any;

      const plain = classToClass(test) as Partial<Test>;

      expect(plain.test).to.be.instanceOf(ObjectId);
      expect(plain.test!.toHexString()).to.be.equal(test.test);
    });

    it('should keep an object id', () => {
      class Test {
        @ToObjectId()
        test!: ObjectId;
      }

      const test = new Test();
      test.test = new ObjectId();

      const plain = classToClass(test) as Partial<Test>;

      expect(plain.test).to.be.instanceOf(ObjectId);
      expect(plain.test!.equals(test.test)).to.be.true;
    });
  });

  context('plainToClass()', () => {
    it('should transform a string into an object id', () => {
      class Test {
        @ToObjectId()
        test!: ObjectId;
      }

      const id = new ObjectId().toHexString();

      const test = plainToClass(Test, { test: id });

      expect(test.test.equals(id)).to.be.true;
    });

    it('should not throw an error when the string can not be converted to object id', () => {
      class Test {
        @ToObjectId()
        test!: ObjectId;
      }

      const id = faker.random.uuid();

      const test = plainToClass(Test, { test: id });

      expect(test.test).to.be.equal(id);
    });
  });
});
