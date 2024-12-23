export { tetris };

import { getRandomItem } from './random.js';
import { getMatrixStats } from './matrix.js';
import {
  ominoDict, ominoRegistry,
  commonOminos, uncommonOminos,
} from './ominos.js';

const tetris = {
  getSomeOmino,
  chooseDropPosition,
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
