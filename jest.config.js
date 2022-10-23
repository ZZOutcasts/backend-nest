/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleFileExtensions: ['ts', 'js', 'json'],
  modulePaths: ['<rootDir>'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
