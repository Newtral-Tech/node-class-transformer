// eslint-disable-next-line max-classes-per-file
import { Default } from '@newtral/class-transformer';
import { expect } from 'chai';
import { plainToClass, plainToInstance } from 'class-transformer';
import faker from 'faker';

describe('@Default()', () => {
  describe('plainToClass()', () => {
    it('should add the default value when not present', () => {
      const defaultValue = faker.datatype.uuid();

      class Test {
        @Default(defaultValue)
        test!: string;
      }

      const plain: Partial<Test> = {};
      const test = plainToClass(Test, plain);

      expect(test.test).to.be.equal(defaultValue);
    });

    it('should add the default value when not present (using a function)', () => {
      const defaultValue = faker.datatype.uuid();

      class Test {
        @Default(() => defaultValue)
        test!: string;
      }

      const plain: Partial<Test> = {};
      const test = plainToClass(Test, plain);

      expect(test.test).to.be.equal(defaultValue);
    });

    it('should keep the given value when present', () => {
      const defaultValue = faker.datatype.uuid();

      class Test {
        @Default(() => defaultValue)
        test!: string;
      }

      const plain: Partial<Test> = { test: faker.datatype.uuid() };
      const test = plainToClass(Test, plain);

      expect(test.test).to.be.equal(plain.test);
    });

    it('should not set the default when the value is null', () => {
      const defaultValue = faker.datatype.uuid();

      class Test {
        @Default(() => defaultValue)
        test!: string | null;
      }

      const plain: Partial<Test> = { test: null };
      const test = plainToClass(Test, plain);

      expect(test.test).to.be.equal(null);
    });
  });

  describe('plainToInstance()', () => {
    it('should add the default value when not present', () => {
      const defaultValue = faker.datatype.uuid();

      class Test {
        @Default(defaultValue)
        test!: string;
      }

      const plain: Partial<Test> = {};
      const test = plainToInstance(Test, plain);

      expect(test.test).to.be.equal(defaultValue);
    });

    it('should add the default value when not present (using a function)', () => {
      const defaultValue = faker.datatype.uuid();

      class Test {
        @Default(() => defaultValue)
        test!: string;
      }

      const plain: Partial<Test> = {};
      const test = plainToInstance(Test, plain);

      expect(test.test).to.be.equal(defaultValue);
    });

    it('should keep the given value when present', () => {
      const defaultValue = faker.datatype.uuid();

      class Test {
        @Default(() => defaultValue)
        test!: string;
      }

      const plain: Partial<Test> = { test: faker.datatype.uuid() };
      const test = plainToInstance(Test, plain);

      expect(test.test).to.be.equal(plain.test);
    });

    it('should not set the default when the value is null', () => {
      const defaultValue = faker.datatype.uuid();

      class Test {
        @Default(() => defaultValue)
        test!: string | null;
      }

      const plain: Partial<Test> = { test: null };
      const test = plainToInstance(Test, plain);

      expect(test.test).to.be.equal(null);
    });
  });
});
