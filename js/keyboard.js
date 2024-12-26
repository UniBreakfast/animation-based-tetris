export { enableKeyboardControl };

import { tetris } from './tetris.js';

let state;

const keyActionMap = {
  ArrowUp: 'rotate',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyW: 'rotate',
  KeyS: 'down',
  KeyA: 'left',
  KeyD: 'right',
  Space: 'drop',
  KeyP: 'pause',
  Escape: 'pause',
};

const resumingActions = ['rotate', 'left', 'right'];
const resumingOnlyActions = ['down', 'drop', 'pause'];
const moveActions = ['left', 'right', 'up', 'down'];
const shifts = {
  left: { row: 0, column: -1 },
  right: { row: 0, column: 1 },
  up: { row: -1, column: 0 },
  down: { row: 1, column: 0 },
}

function enableKeyboardControl(stateRef, { pause, resume }) {
  state = stateRef;

  onkeydown = ({ code }) => {
    const action = keyActionMap[code];

    if (action) {
      if (state.paused) {
        if (resumingOnlyActions.includes(action)) return resume();

        if (resumingActions.includes(action)) resume();

      } else if (action === 'pause') {
        return pause();
      }

      if (moveActions.includes(action) && tetris.canMove(action)) {
        const { row, column } = shifts[action];

        state.row += row;
        state.column += column;
      }

      if (action === 'rotate' && tetris.canRotate()) {
        state.omino = tetris.rotate(state.omino);
        state.turn++;
      }
    }
  };
}
