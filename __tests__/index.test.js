import { fileURLToPath } from 'url';
import path from 'path';
import { jest } from '@jest/globals';
import { compareFiles } from '../src/index.js';

global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
};

test('gendiff', async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const tryAnswer = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  compareFiles(file1, file2);
  // global.console.log.replace(/\s{2,}/g, ' ');

  expect(global.console.log).toHaveBeenCalledWith(tryAnswer);
});
