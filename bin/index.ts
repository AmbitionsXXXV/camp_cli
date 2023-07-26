#!/usr/bin/env node

console.log('hello world')
const program = require('commander')
program.version(require('../package').version).usage('<command> [options]')
program.parse(process.argv)

