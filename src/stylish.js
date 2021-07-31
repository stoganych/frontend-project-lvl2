import _ from 'lodash';

const stringifyKeyValue = (object, key) => `${key}: ${object[key]}`;

const stylish = (object1, object2, key) => {
  if (!_.has(object1, key)) return `+ ${stringifyKeyValue(object2, key)}`;
  if (!_.has(object2, key)) return `- ${stringifyKeyValue(object1, key)}`;
  if (object1[key] !== object2[key]) return `- ${stringifyKeyValue(object1, key)}\n  + ${stringifyKeyValue(object2, key)}`;
  return `  ${stringifyKeyValue(object1, key)}`;
};

export default stylish;
