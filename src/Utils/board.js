export const initBoard = (w, h, diff = 6) => {
  let board = [];
  let adj = [];
  let covered = [];
  for (let i = 0; i < h; i++) {
    let t = [];
    let tx = [];
    for (let j = 0; j < w; j++) {
      let chance = Math.floor(Math.random() * w * diff);
      if (chance >= 0 && chance < w) t.push(1);
      else t.push(0);
      tx.push(1);
    }
    board.push(t);
    covered.push(tx);
  }

  let xd = [1, 0, -1, 0, 1, 1, -1, -1];
  let yd = [0, -1, 0, 1, 1, -1, 1, -1];

  const check = (x, y) => {
    if (x >= 0 && y >= 0 && x < h && y < w && board[x][y] === 1) return true;
    return false;
  };

  for (let i = 0; i < h; i++) {
    let t = [];
    for (let j = 0; j < w; j++) {
      let c = 0;
      for (let k = 0; k < 8; k++) {
        if (check(xd[k] + i, yd[k] + j)) {
          c++;
        }
      }
      t.push(c);
    }
    adj.push(t);
  }

  return [board, adj, covered];
};
