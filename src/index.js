import { readFileSync } from 'fs';
import _ from 'lodash';

const getFile = (path) => readFileSync(path);
const parseJSONFromFile = (path) => JSON.parse(getFile(path));

const stringifyKeyValue = (object, key) => `${key}: ${object[key]}`;

export const generateDiffLine = (object1, object2, key) => {
  if (!_.has(object1, key)) return `+ ${stringifyKeyValue(object2, key)}`;
  if (!_.has(object2, key)) return `- ${stringifyKeyValue(object1, key)}`;
  if (object1[key] !== object2[key]) return `- ${stringifyKeyValue(object1, key)}\n  + ${stringifyKeyValue(object2, key)}`;
  return `  ${stringifyKeyValue(object1, key)}`;
};

export const compareFiles = (path1, path2) => {
  const obj1 = parseJSONFromFile(path1);
  const obj2 = parseJSONFromFile(path2);
  const keys = _.union(Object.keys(obj1), Object.keys(obj2))
    .sort()
    .reduce((diffString, key) => `${diffString}\n  ${generateDiffLine(obj1, obj2, key)}`, '');
  return console.log(`{${keys}\n}`);
};
