export { tetris };

import { getRandomItem } from './random.js';
import {
  ominoDict, ominoRegistry,
  commonOminos, uncommonOminos,
} from './ominos.js';

const tetris = {
  getSomeOmino,
};

function getSomeOmino() {
  const isCommon = Math.random() > 0.1;

  return getRandomItem(isCommon ? commonOminos : uncommonOminos);
}
