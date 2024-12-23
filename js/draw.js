import { getMatrixStats } from "./matrix.js";

export { drawSquareMatrix };

function drawSquareMatrix(
  ctx, matrix, x, y, squareSize, lineWidth, rotationAngle
) {
  const { width, height } = getMatrixStats(matrix);
  const wShift = width * squareSize / 2;
  const hShift = height * squareSize / 2;

  ctx.save();
  ctx.translate(x + wShift, y + hShift);
  ctx.rotate(rotationAngle);

  for (let i = 0; i < height; i++) {
    const row = matrix[i];

    for (let j = 0; j < width; j++) {
      const color = row[j];
      
      if (color) {
        ctx.fillStyle = color.bg;
        ctx.fillRect(
          j * squareSize - wShift, 
          i * squareSize - hShift, 
          squareSize, squareSize,
        );
        ctx.strokeStyle = color.fg;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(
          j * squareSize - wShift, 
          i * squareSize - hShift, 
          squareSize, squareSize,
        );
      }
    }
  }

  ctx.restore();
}
