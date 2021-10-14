import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (file) => {
  const filename = fs.readFileSync(path.resolve(file), 'utf-8');
  const format = path.extname(file);
  if (format === '.json') {
    return JSON.parse(filename);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(filename);
  }
  return file;
};
