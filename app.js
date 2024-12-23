import { main } from './js/elements.js';
import { prepareConfig } from './js/config.js';
import { prepareState } from './js/state.js';
import { prepareGlass } from './js/glass.js';
import { prepareTeaser } from './js/teaser.js';
import { prepareAnimate } from './js/animate.js';
import { tetris } from './js/tetris.js';
import { expose } from './js/expose.js';
import { colors, colorDict } from './js/ominos.js';

const config = prepareConfig(colorDict, colors);
const state = prepareState(config, tetris);
const glass = prepareGlass(config, main);
const teaser = prepareTeaser(config);
const animate = prepareAnimate(config, state, glass, teaser);

start();

expose({ config, state, glass, teaser });

function start() {
  config.startTime = Date.now();

  animate(Date.now());
}
