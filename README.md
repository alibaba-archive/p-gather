p-gather
=========

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/p-gather.svg?style=flat-square
[npm-url]: https://npmjs.org/package/p-gather
[travis-image]: https://img.shields.io/travis/node-modules/p-gather.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/p-gather
[codecov-image]: https://img.shields.io/codecov/c/github/node-modules/p-gather.svg?style=flat-square
[codecov-url]: https://codecov.io/github/node-modules/p-gather?branch=master
[david-image]: https://img.shields.io/david/node-modules/p-gather.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/p-gather
[snyk-image]: https://snyk.io/test/npm/p-gather/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/p-gather
[download-image]: https://img.shields.io/npm/dm/p-gather.svg?style=flat-square
[download-url]: https://npmjs.org/package/p-gather

Execute Promise in parallel with concurrency support and gather all the results.

`p-gather` is similar with [co-parallel](https://github.com/visionmedia/co-parallel), but `p-gather` will gather all the result of these Promise, even those Promise throw error.

## Installation

```
$ npm install p-gather
```

## Example

```js
const gather = require('p-gather');
const thread = require('co-thread');

function sleep(n) {
  return new Promise(resolve => {
    setTimeout(resolve, n);
  });
}

let index = 0;
async function random() {
  let i = index++;
  await sleep(Math.random() * 100);
  if (Math.random() > 0.5) {
    throw new Error('error');
  }
  return i;
}

(async =>{
  const ret = await gather(thread(random, 10));
  console.log(ret);
})();
```

=>

```
[
  { isError: true, error: [Error: error] },
  { isError: true, error: [Error: error] },
  { isError: true, error: [Error: error] },
  { isError: true, error: [Error: error] },
  { isError: true, error: [Error: error] },
  { isError: false, value: 5 },
  { isError: false, value: 6 },
  { isError: false, value: 7 },
  { isError: true, error: [Error: error] },
  { isError: true, error: [Error: error] }
]
```

## API

### gather(Promise, [concurrency])

Execute `Promise` in parallel, with the given concurrency defaulting to 5, and gather the result

## License

MIT
