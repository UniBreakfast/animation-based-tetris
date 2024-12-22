export { prepareGlass };

let config;

const glass = {
  updateSizing() {
    const { rowCount, columnCount } = config;
    const blockSize = window.innerHeight / rowCount;

    config.blockSize = blockSize;
    canvas.width = blockSize * columnCount;
    canvas.height = window.innerHeight;
  }
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
