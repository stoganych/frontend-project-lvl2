import {
  readFileSync,
} from 'fs';
import path from 'path';
import _ from 'lodash';
import stylish from './stylish.js';
import parser from './parsers.js';

const getFile = (pathToFile) => readFileSync(pathToFile);
const getFormat = (configPath) => path.extname(configPath);

const createATS = (tree1, tree2) => {
  const createObj = (name, depth, type, children) => ({
    name,
    depth,
    type,
    children,
  });

  const iter = (node1, node2, depth) => {
    const keys = _.union(Object.keys(node1), Object.keys(node2)).sort();
    return keys.map((key) => {
      if (!_.isObject(node1[key]) || !_.isObject(node2[key])) {
        if (!_.has(node1, key)) return createObj(key, depth, 'plus', node2[key]);
        if (!_.has(node2, key)) return createObj(key, depth, 'minus', node1[key]);
        if (node1[key] !== node2[key]) return [createObj(key, depth, 'minus', node2[key]), createObj(key, depth, 'plus', node1[key])];
        return createObj(key, depth, 'equal', node1[key]);
      }
      if (!_.has(node1, key)) return createObj(key, depth, 'minus', iter(node1[key], node2[key], depth + 2));
      if (!_.has(node2, key)) return createObj(key, depth, 'plus', iter(node1[key], node2[key], depth + 2));
      return createObj(key, depth, 'equal', iter(node1[key], node2[key], depth + 2));
    });
  };
  return iter(tree1, tree2, 0);
};

const compareFiles = (path1, path2) => {
  const obj1 = parser(getFile(path1), getFormat(path1));
  const obj2 = parser(getFile(path2), getFormat(path2));
  const ATS = createATS(obj1, obj2);

  console.log(ATS);
};

export default compareFiles;
