#!/usr/bin/env node

import {
  Command
} from 'commander';
import compareFiles from '../src/index.js';
const program = new Command();

program.version('0.0.1');
program.argument('<filepath1>')
  .argument('<filepath2>')
  .action((path1, path2) => compareFiles(path1, path2));
program.description('Compares two configuration files and shows a difference.');
program.option('-f, --format [type]', 'output format');

program.parse(process.argv);
const options = program.opts();
