import { fileURLToPath } from 'url';
import path from 'path';
import { compareFiles } from '../src/index.js';

test('gendiff', async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const tryAnswer = ' - follow: false host: hexlet.io - proxy: 123.234.53.22 - timeout: 50 + timeout: 20 + verbose: true';
  const answer = compareFiles(file1, file2).replace(/\s{2,}/g, ' ');
  expect(answer).toEqual(tryAnswer);
});
