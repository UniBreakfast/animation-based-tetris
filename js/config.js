export { prepareConfig };

import { shuffle } from './random.js';

const config = {
  rowCount: 20,
  columnCount: 10,
  blockSize: 10, // example value, updated by glass
  lineWidthRatio: 1/25,
  lineWidth: 1, // example value, updated by glass
  lineColor: '#bbb',
  startTime: 1734960490238, // example value, updated on start
  stepDuration: 500,
  // stepDuration: 1000,
  // stepDuration: 4000,
  colorDict: {1: 'red', 2: 'blue'}, // example value, updated by prepareConfig
};

function prepareConfig(colorDict, colors) {
  config.colorDict = {
    ...colorDict,
    ...Array(8).concat(shuffle([...colors])),
  };
  return config;
}
