export { prepareConfig };

import { shuffle } from './random.js';

const config = {
  rowCount: 20,
  columnCount: 10,
  blockSize: 10, // example value, updated by glass
  lineWidthRatio: 1/25,
  lineWidth: 1, // example value, updated by glass
};

function prepareConfig(colorDict, colors) {
  config.colorDict = {
    ...colorDict,
    ...Array(8).concat(shuffle([...colors])),
  };
  return config;
}
