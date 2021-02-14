export function complete(board) {
  let res = true;
  for (let i = 0; i < this.h; i++) {
    for (let j = 0; j < this.w; j++) {
      if (
        board[2][i][j] === 1 &&
        board[0][i][j] === 1 &&
        (board[2][i][j] || board[0][i][j])
      ) {
        continue;
      }
      res = false;
    }
  }
  return res;
}
