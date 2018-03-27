'use strict';

const assert = require('assert');
const gather = require('../');
const thread = gather.thread;

function sleep(n) {
  return new Promise(resolve => {
    setTimeout(resolve, n);
  });
}

let index = 0;
async function random() {
  const i = index++;
  await sleep(Math.random() * 100);
  if (i > 5) {
    throw new Error('error');
  }
  return i;
}

describe('p-gather', () => {
  it('should gather ok', async () => {
    const ret = await gather(thread(random, 10));
    assert(ret.length === 10);
    for (let i = 0; i < ret.length; i++) {
      if (i < 6) {
        assert(ret[i].value === i);
        assert(!ret[i].isError);
      } else {
        assert(ret[i].isError);
      }
    }
  });
});
