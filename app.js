import { main } from './js/elements.js';
import { prepareConfig } from './js/config.js';
import { prepareState } from './js/state.js';
import { prepareGlass } from './js/glass.js';
import { prepareTeaser } from './js/teaser.js';
import { prepareAnimate } from './js/animate.js';
import { tetris } from './js/tetris.js';
import { expose } from './js/expose.js';
import { colors, colorDict } from './js/ominos.js';
import { enableKeyboardControl } from './js/keyboard.js';

const config = prepareConfig(colorDict, colors);
const state = prepareState(config, tetris);
const glass = prepareGlass(config, main);
const teaser = prepareTeaser(config);

let animate;

start();

expose({ config, state, glass, teaser });

function start() {
  const now = performance.now();
  
  config.startTime = now;
  
  animate = prepareAnimate(config, state, glass, teaser);

  enableKeyboardControl(state, {pause, resume});

  animate(now);
}

function pause() {
  animate.pause();
}

function resume() {
  animate.resume();
}
