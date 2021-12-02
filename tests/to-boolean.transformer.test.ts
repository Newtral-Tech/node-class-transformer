// eslint-disable-next-line max-classes-per-file
import { ToBoolean } from '@newtral/class-transformer';
import { expect } from 'chai';
import { plainToClass, plainToInstance } from 'class-transformer';
import faker from 'faker';

describe('@ToBoolean()', () => {
  describe('plainToClass()', () => {
    it('should convert a string to boolean', () => {
      class Test {
        @ToBoolean()
        test!: boolean;
      }

      const test = plainToClass(Test, { test: 'false' });

      expect(test.test).to.be.false;
    });

    it('should convert a integer to boolean', () => {
      class Test {
        @ToBoolean()
        test!: boolean;
      }

      const test = plainToClass(Test, { test: 0 });

      expect(test.test).to.be.false;
    });

    it('should use the default value when value is undefined', () => {
      const testValue = faker.datatype.boolean();

      class Test {
        @ToBoolean({ default: testValue })
        test!: boolean;
      }

      const test = plainToClass(Test, {});

      expect(test.test).to.be.equal(testValue);
    });

    it('should not set defaults when he value exists', () => {
      const testValue = faker.datatype.boolean();

      class Test {
        @ToBoolean({ default: !testValue })
        test!: boolean;
      }

      const test = plainToClass(Test, { test: testValue });

      expect(test.test).to.be.equal(testValue);
    });
  });

  describe('plainToInstance()', () => {
    it('should convert a string to boolean', () => {
      class Test {
        @ToBoolean()
        test!: boolean;
      }

      const test = plainToInstance(Test, { test: 'false' });

      expect(test.test).to.be.false;
    });

    it('should convert a integer to boolean', () => {
      class Test {
        @ToBoolean()
        test!: boolean;
      }

      const test = plainToInstance(Test, { test: 0 });

      expect(test.test).to.be.false;
    });

    it('should use the default value when value is undefined', () => {
      const testValue = faker.datatype.boolean();

      class Test {
        @ToBoolean({ default: testValue })
        test!: boolean;
      }

      const test = plainToInstance(Test, {});

      expect(test.test).to.be.equal(testValue);
    });

    it('should not set defaults when he value exists', () => {
      const testValue = faker.datatype.boolean();

      class Test {
        @ToBoolean({ default: !testValue })
        test!: boolean;
      }

      const test = plainToInstance(Test, { test: testValue });

      expect(test.test).to.be.equal(testValue);
    });
  });
});
