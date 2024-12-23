export { prepareAnimate };

function prepareAnimate(config, state, glass, teaser) {
  let i = 0;
  
  return animate;

  function animate(now) {
    const { omino, row, column } = state;

    i++;
    
    glass.clear();
    glass.drawOmino(omino, row, column, 0, 0, i / 50);

    requestAnimationFrame(animate);
  }
}
  