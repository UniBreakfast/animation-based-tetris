export { prepareGlass };

import { drawSquareMatrix } from './draw.js';

let config;

const glass = {
  updateSizing, clear, drawGrid, drawOmino,
};

const canvas = Object.assign(
  document.createElement('canvas'),
  { id: 'glass' },
);
const ctx = canvas.getContext('2d');

function prepareGlass(configRef, parent) {
  config = configRef;
  parent.append(canvas);

  glass.updateSizing();

  window.addEventListener('resize', glass.updateSizing);
  
  return glass;
}

function updateSizing() {
  const { rowCount, columnCount, lineWidthRatio } = config;
  const blockSize = window.innerHeight / rowCount;
  const lineWidth = blockSize * lineWidthRatio;

  Object.assign(config, { blockSize, lineWidth });
  canvas.width = blockSize * columnCount;
  canvas.height = window.innerHeight;
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
  const { blockSize } = config;

  ctx.strokeStyle = config.lineColor;

  for (let i = 0; i < canvas.height; i += blockSize) {
    for (let j = 0; j < canvas.width; j += blockSize) {
      ctx.strokeRect(j, i, blockSize, blockSize);
    }
  }
}

function drawOmino(omino, row, column, turn) {
  const { blockSize, lineWidth, colorDict } = config;
  const x = column * blockSize;
  const y = row * blockSize;
  const rotationAngle = turn * Math.PI / 2;
  const matrix = omino.map(
    row => row.map(
      i => i && ({bg: colorDict[i], fg: colorDict.line})
    )
  );

  drawSquareMatrix(
    ctx, matrix, x, y, blockSize, lineWidth, rotationAngle
  );
}
