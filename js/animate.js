export { prepareAnimate };

let config;

function prepareAnimate(configRef, state, glass, teaser) {
  config = configRef;

  let { startTime, stepDuration} = config;
  let stepStartTime = startTime;
  let stepEndTime = startTime + stepDuration;
  let stepProgress = 0;
  let rowActual = state.row;
  let columnActual = state.column;
  let turnActual = 0;
  let rowNext = state.row + 1;
  let columnNext = state.column;
  let turnNext = 0;
  let lastTime = startTime;
  let frameRequestId;

  Object.assign(animate, { pause, resume });
  
  return animate;

  function animate(now) {
    const { stepDuration } = config;
    
    stepProgress = (now - stepStartTime) / stepDuration;
    lastTime = now;

    if (now >= stepEndTime) {
      stepProgress--;
      state.row = rowActual = rowNext;
      rowNext++;
      stepStartTime = stepEndTime;
      stepEndTime += stepDuration;
    }

    const { omino, row, column } = state;
    const rowShift = stepProgress;

    glass.clear();
    glass.drawOmino(omino, row, column, rowShift, 0, 0);

    frameRequestId = requestAnimationFrame(animate);
  }

  function pause() {
    state.paused = true;

    cancelAnimationFrame(frameRequestId);
  }

  function resume() {
    const now = performance.now();
    
    state.paused = false;
    stepStartTime = now - stepProgress * stepDuration;
    stepEndTime = stepStartTime + stepDuration;

    animate(now);
  }
}
