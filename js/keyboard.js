export { enableKeyboardControl };

import { tetris } from './tetris.js';

let state;

const keyMap = {
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

const continueActionKeys = ['rotate', 'left', 'right'];
const continueKeys = ['down', 'drop', 'pause'];

function enableKeyboardControl(stateRef, { pause, resume }) {
  state = stateRef;

  onkeydown = ({ code }) => {
    const action = keyMap[code];

    if (action) {
      if (state.paused) {
        if (continueKeys.includes(action)) return resume();

        if (continueActionKeys.includes(action)) resume();

      } else if (action === 'pause') {
        return pause();
      }

      tetris[action]?.();
    }
  };
}
