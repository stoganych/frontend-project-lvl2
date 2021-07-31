import path from 'path';
import _ from 'lodash';
import stylish from './stylish.js';
import parser from './parsers.js';

const getFormat = (configPath) => path.extname(configPath);

const compareFiles = (path1, path2) => {
  const obj1 = parser(path1, getFormat(path1));
  const obj2 = parser(path2, getFormat(path1));
  const keys = _.union(Object.keys(obj1), Object.keys(obj2))
    .sort()
    .reduce((diffString, key) => `${diffString}\n  ${stylish(obj1, obj2, key)}`, '');
  return console.log(`{${keys}\n}`);
};

export default compareFiles;
