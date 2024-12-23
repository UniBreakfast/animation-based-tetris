export { makeMatrix, getMatrixStats };

function makeMatrix(rowCount, columnCount) {
  return Array.from(
    { length: rowCount },
    () => Array(columnCount).fill(0),
  );
}

/* const {
      count, width, height, startRow, endRow, startCol, endCol
    } = getMatrixStats(shape); */
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
