export { tetris };

import { getRandomItem } from './random.js';
import { getMatrixStats, rotateMatrixClockwise } from './matrix.js';
import {
  ominoDict, ominoRegistry,
  commonOminos, uncommonOminos,
} from './ominos.js';

const tetris = {
  getSomeOmino,
  chooseDropPosition,
  canMove, canRotate, rotate,
};

function getSomeOmino() {
  const isCommon = Math.random() > 0.1;

  return getRandomItem(isCommon ? commonOminos : uncommonOminos);
}

function chooseDropPosition(omino, columnCount) {
  const { startRow, startCol, endCol } = getMatrixStats(omino);
  const width = endCol - startCol + 1;
  const round = getRandomItem([Math.floor, Math.ceil]);
  const row = 0 - startRow;
  const column = round((columnCount - width) / 2 - startCol);

  return { row, column };
}

function canMove(action, omino, row, column, columnCount, rowCount) {
  const { startRow, endRow, startCol, endCol } = getMatrixStats(omino);

  if (action === 'left') return column > -startCol;
  if (action === 'right') return column < columnCount - 1 - endCol;
  if (action === 'up') return row > startRow;
  if (action === 'down') return row < rowCount - endRow - 1;
}

function canRotate() {
  return true;
}

function rotate(omino) {
  return rotateMatrixClockwise(omino);
}
