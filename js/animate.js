export { prepareAnimate };

import { getMatrixStats, mergeMatrices } from './matrix.js';
import { tetris } from './tetris.js';

let config;

function prepareAnimate(configRef, state, glass, teaser) {
  config = configRef;

  let { startTime, stepDuration } = config;
  let { omino, row, column, turn, grid } = state;
  let { startRow, endRow } = getMatrixStats(omino);
  let lastTime = startTime;
  let stepStartTime = startTime;
  let leftTime = stepDuration;
  let stepEndTime = startTime + stepDuration;
  let deltaTime = 0;
  let stepProgress = 0;
  let rowPrevious = row - (endRow - startRow + 1);
  let rowActual = rowPrevious;
  let rowNext = row;
  let rowShift = 0;
  let columnPrevious = column;
  let columnActual = column;
  let columnNext = column;
  let columnShift = 0;
  let turnPrevious = 0;
  let turnActual = 0;
  let turnNext = 0;
  let turnShift = 0;
  let frameRequestId;

  Object.assign(animate, { pause, resume });

  return animate;

  function animate(now) {
    const { stepDuration } = config;

    if (now < stepEndTime) {
      deltaTime = now - lastTime;
      leftTime = stepEndTime - lastTime;

    } else {
      // return pause();
      deltaTime = now - stepEndTime;
      stepStartTime = stepEndTime;
      stepEndTime = stepStartTime + stepDuration;
      leftTime = stepDuration;
      rowActual = rowNext;
      columnActual = columnNext;
      turnActual = turnNext;
      rowPrevious = rowNext;
      columnPrevious = columnNext;
      turnPrevious = turnNext;
      if (tetris.canMove(
        'down', 
        omino, 
        rowNext, 
        columnNext, 
        config.columnCount, 
        config.rowCount
      )) {
        rowNext++;
      } else {
        mergeMatrices(state.grid, omino, rowNext, columnNext);
        omino = state.next;
        
        const next = tetris.getSomeOmino();
        const { startRow, endRow } = getMatrixStats(omino);
        const { row, column } = tetris.chooseDropPosition(
          omino, config.columnCount
        );

        rowNext = row;
        columnNext = columnPrevious = columnActual = column;
        turnNext = turnPrevious = turnActual = turn = 0;
        rowActual = rowPrevious = rowNext - (endRow - startRow + 1);

        Object.assign(state, { omino, row, column, turn, next });
      }
      state.row = rowNext;
    }

    ({
      omino,
      row, row: rowNext,
      column, column: columnNext,
      turn, turn: turnNext
    } = state);

    rowShift = deltaTime / leftTime * (rowNext - rowActual);
    columnShift = deltaTime / leftTime * (columnNext - columnActual);
    turnShift = deltaTime / leftTime * (turnNext - turnActual);

    rowActual += rowShift;
    columnActual += columnShift;
    turnActual += turnShift;

    glass.clear();
    glass.drawGrid(grid);
    glass.drawOmino(omino, rowActual, columnActual, turnActual - turn);
    lastTime = now;

    frameRequestId = requestAnimationFrame(animate);
  }

  function pause() {
    state.paused = true;
    stepProgress = (lastTime - stepStartTime) / stepDuration;

    cancelAnimationFrame(frameRequestId);
  }

  function resume() {
    const now = performance.now();

    state.paused = false;
    stepStartTime = now - stepProgress * stepDuration;
    stepEndTime = stepStartTime + stepDuration;
    lastTime = now;

    animate(now);
  }
}
