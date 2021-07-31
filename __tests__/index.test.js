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
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  compareFiles(file1, file2);

  expect(global.console.log).toHaveBeenCalledWith(tryAnswer);

  const fileYaml1 = getFixturePath('fileYaml1.yml');
  const fileYaml2 = getFixturePath('fileYaml2.yaml');

  compareFiles(fileYaml1, fileYaml2);

  expect(global.console.log).toHaveBeenCalledWith(tryAnswer);
});
