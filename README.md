# @newtral/class-transformer

## Install

```bash
npm install @newtral/class-transformer class-transformer
```

## Usage

### @Default(defaultValue)

Provide a default value when the value is not present or it is undefined

```typescript
import { Default } from '@newtral/class-transformer';
import { plainToClass } from 'class-transformer';

class Client {
  @Default('http://localhost:3000') // Or using a function @Default(() => 'http://localhost:3000')
  baseUrl: string;
}

const client = plainToClass(Client, {});
console.log(client.baseUrl); // 'http://localhost:3000'

const client = plainToClass(Client, { baseUrl: 'https://example.com' });
console.log(client.baseUrl); // 'https://example.com'
```

### @ToArray(defaultValue)

Transform the property into an array. When the value is undefined there is not action. When the
value is not an array it gets transformer into an array of one element. This could be useful when
obtaining multiple query string values but the user only selects one item.

```typescript
import { ToArray } from '@newtral/class-transformer';
import { plainToClass } from 'class-transformer';

class User {
  @ToArray()
  postIds: string[];
}

const client = plainToClass(User, { postIds: '12345' });
console.log(client.postIds); // ['2345']
```

### @ToBoolean()

A default value can be provided due how to
[this bug in class-transformer](https://github.com/typestack/class-transformer/issues/231). It uses
the [yn](https://www.npmjs.com/package/yn) package for transformations

```typescript
import { ToBoolean } from '@newtral/class-transformer';
import { plainToClass } from 'class-transformer';

class User {
  @ToBoolean({ default: false })
  isAdmin: boolean;
}

const user = plainToClass(User, { isAdmin: 'true' });
console.log(user.isAdmin); // true
```

### @ToObjectId()

Transform an object id value to string an vice versa using the following conventions:

- It will do nothing if the value is undefined
- plain to class or class to class: If the object is a string it uses new ObjectId(value)
- class to plain: converts the object id to it string representation

```typescript
import { ToObjectId } from '@newtral/class-transformer';
import { ObjectId } from 'bson';
import { classToPlain, plainToClass } from 'class-transformer';

class User {
  @ToObjectId()
  _id: ObjectId;
}

const user = plainToClass(User, { _id: '5ed116e81723fcd8ed3d230b' });
console.log(user._id instanceof ObjectId); // true

const plainUser = classToPlain(user);
console.log(typeof user._id); // 'string'
console.log(user._id); // '5ed116e81723fcd8ed3d230b'
```

## Development

The project use [husky](https://github.com/typicode/husky) and
[lint-staged](https://github.com/okonet/lint-staged) for linting and fixing possible errors on
source code before commit

Git hooks scripts are installed after running `npm install` the first time

### npm run build:commonjs

Compile typescript files from the `src` folder inside the `lib` folder

### npm run build:esm

Compile typescript files from the `src` folder inside the `esm` folder using es modules

### npm run build

Concurrently run both `build:commonjs` and `build:esm`

### npm run clean

Remove the following directories/files

- **lib**
- **esm**
- **reports**

### npm test

Run tests files inside the `tests` folder that matches the following patterns. Exit with code > 0 on
error

- **\*.test.ts**
- **\*.spec.ts**

### npm run cover

The same as `npm test` and generates coverages reports in `reports/coverage`. Exit with code > 0 on
error

### npm run lint

Check eslint errors according to `.eslintrc`

### npm run lint:fix

Run `npm run lint` applying fixes and run prettier on every typescript file

### npm run health

Check for:

- Build errors
- Tests failures
- Lint errors

### npm run ci

Run test and generate every possible report. Do not exit with error code > 0 if the tests fail. It
generates a report file instead

- **reports/lint-checkstyle.xml** Lint report in chackstyle format
- **reports/test-results.xml** Test report in xUnit format
- **reports/coverage/clover.xml** Coverage report in clover format
- **reports/coverage/cobertura-coverage.xml** Coverage report in cobertura format
- **reports/coverage/lcov.info** Coverage report in lcov
- **reports/coverage/index.html** Coverage report in html
