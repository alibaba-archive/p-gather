'use strict';

const is = require('is-type-of');
const assert = require('assert');

function thread(fn, n) {
  assert(is.function(fn), 'fn must be function!');
  const gens = [];
  let tag = false;
  while (n--) {
    const f = fn();
    if (!tag) {
      assert(is.promise(f), 'fn\'s return value must be a Promise Object!');
      tag = true;
    }
    gens.push(f);
  }
  return gens;
}

module.exports = async function gather(fns, n) {
  n = Math.min(n || 5, fns.length);
  const ret = [];
  let index = 0;

  async function next() {
    const i = index++;
    ret[i] = { isError: false };
    try {
      ret[i].value = await fns[i];
    } catch (err) {
      ret[i].error = err;
      ret[i].isError = true;
    }

    if (index < fns.length) await next();
  }

  await Promise.all(thread(next, n));

  return ret;
};

module.exports.thread = thread;
