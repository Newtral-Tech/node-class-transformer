// eslint-disable-next-line max-classes-per-file
import { ToArray } from '@newtral/class-transformer';
import { expect } from 'chai';
import { plainToClass } from 'class-transformer';
import faker from 'faker';

describe('@ToArray()', () => {
  it('should convert a single item into an array', () => {
    const testValue = faker.random.uuid();

    class Test {
      @ToArray()
      test!: string[];
    }

    const test = plainToClass(Test, { test: testValue });

    expect(test.test).to.be.deep.equal([testValue]);
  });

  it('should not convert to array when the value is undefined', () => {
    class Test {
      @ToArray()
      test!: string[];
    }

    const test = plainToClass(Test, { test: undefined });

    expect(test.test).to.be.undefined;
  });

  it('should not convert to array when the value is already an array', () => {
    class Test {
      @ToArray()
      test!: string[];
    }

    const testValue = [faker.random.uuid()];
    const test = plainToClass(Test, { test: testValue });

    expect(test.test).to.be.deep.equal(testValue);
  });
});
