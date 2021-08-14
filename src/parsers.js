import yaml from 'js-yaml';

const parseJSONFromFile = (file) => JSON.parse(file);
const parseYAMLFromFile = (file) => yaml.load(file);

const parser = (data, format) => {
  if (format === '.yaml') return parseYAMLFromFile(data);
  if (format === '.yml') return parseYAMLFromFile(data);
  return parseJSONFromFile(data);
};

export default parser;
