import * as fs from 'fs';
import _ from 'lodash';

const getFile = (pathToFile) => fs.readFileSync(pathToFile);

const compareFiles = (pathToFile1, pathToFile2) => {
  const obj1 = JSON.parse(getFile(pathToFile1));
  const obj2 = JSON.parse(getFile(pathToFile2));
  const keys = _.union(Object.keys(obj1), Object.keys(obj2))
    .sort()
    .reduce((acc, key) => {
      if (!_.has(obj1, key)) return `${acc} \n  + ${key}: ${obj2[key]}`;
      if (!_.has(obj2, key)) return `${acc} \n  - ${key}: ${obj1[key]}`;
      if (obj1[key] !== obj2[key]) return `${acc} \n  - ${key}: ${obj1[key]} \n  + ${key}: ${obj2[key]}`;
      return `${acc} \n    ${key}: ${obj1[key]}`;
    }, '');
  console.log(`{${keys}\n}`);
};

export default compareFiles;
