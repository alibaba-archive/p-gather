'use strict';

module.exports = {
  write: true,
  prefix: '^',
  test: [
    'test',
  ],
  dep: [
  ],
  devdep: [
    'egg-bin',
    'autod',
    'eslint',
    'eslint-config-egg',
  ],
  semver: [
  ],
  exclude: [
    './test/fixtures',
    './coverage',
  ]
};
