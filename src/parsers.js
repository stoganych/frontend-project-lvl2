import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const getFile = (pathToFile) => readFileSync(pathToFile);

const parseJSONFromFile = (pathToFile) => JSON.parse(getFile(pathToFile));
const parseYAMLFromFile = (pathToFile) => yaml.load(getFile(pathToFile));

const parser = (data, format) => {
  if (format === '.yaml') return parseYAMLFromFile(data);
  if (format === '.yml') return parseYAMLFromFile(data);
  return parseJSONFromFile(data);
};

export default parser;
