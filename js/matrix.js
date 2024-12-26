export {
  makeMatrix, getMatrixStats, rotateMatrixClockwise, mergeMatrices,
};

function makeMatrix(rowCount, columnCount) {
  return Array.from(
    { length: rowCount },
    () => Array(columnCount).fill(0),
  );
}

function getMatrixStats(matrix) {
  const height = matrix.length;
  const width = matrix[0].length;
  let count = 0;
  let startRow = height - 1;
  let endRow = 0;
  let startCol = width - 1;
  let endCol = 0;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (matrix[i][j]) {
        count++;
        startRow = Math.min(startRow, i);
        endRow = Math.max(endRow, i);
        startCol = Math.min(startCol, j);
        endCol = Math.max(endCol, j);
      }
    }
  }

  return { count, width, height, startRow, endRow, startCol, endCol };
}

function rotateMatrixClockwise(matrix) {
  const height = matrix.length;
  const width = matrix[0].length;
  const rotatedMatrix = makeMatrix(width, height);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      rotatedMatrix[j][height - 1 - i] = matrix[i][j];
    }
  }

  return rotatedMatrix;
}

function mergeMatrices(targetMatrix, sourceMatrix, row, column) {
  for (let i = 0; i < sourceMatrix.length; i++) {
    for (let j = 0; j < sourceMatrix[0].length; j++) {
      if (sourceMatrix[i][j]) {
        targetMatrix[row + i][column + j] = sourceMatrix[i][j];
      }
    }
  }
}
