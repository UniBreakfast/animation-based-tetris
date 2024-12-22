export { prepareState };

import { makeMatrix } from './matrix.js';

const state = {
  row: 0, // posion of the top-left corner of the
  column: 2, // current omino relative to the grid
  omino: [ // like this one
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ], // but randomly selected
  next: [ // similar to above
    [0, 2, 2],
    [2, 2, 0],
    [0, 0, 0],
  ], // random too
  grid: [ // like this one
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ], // but with rowCount and columnCount
};

function prepareState(config, tetris) {
  const { rowCount, columnCount } = config;
  const omino = tetris.getSomeOmino();
  const { row, column } = chooseDropPosition(omino, columnCount);
  const next = tetris.getSomeOmino();
  const grid = makeMatrix(rowCount, columnCount);
  
  return Object.assign(state, { row, column, omino, next, grid });
}
