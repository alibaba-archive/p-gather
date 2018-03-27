'use strict';

const thread = require('co-thread');

module.exports = async function gather(thunks, n) {
  n = Math.min(n || 5, thunks.length);
  const ret = [];
  let index = 0;

  async function next() {
    const i = index++;
    ret[i] = { isError: false };
    try {
      ret[i].value = await thunks[i]();
    } catch (err) {
      ret[i].error = err;
      ret[i].isError = true;
    }

    if (index < thunks.length) await next();
  }

  await Promise.all(thread(next(), n));

  return ret;
};
