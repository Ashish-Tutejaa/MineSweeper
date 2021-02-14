import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import { Wrapper } from "./StyledComponents.js";
import Table from "./Table.js";
import { initBoard } from "./Utils/board.js";
import { complete } from "./Utils/complete.js";
import { clickContext } from "./Context.js";

const Reset = styled.button`
  margin: 5px;
  outline: none;
  border: none;
  background-color: #abc;
  padding: 6px 8px;
  font-size: 0.85rem;
  border-radius: 5px;
  text-align: center;
  transition-duration: 200ms;
  &:hover {
    background-color: white;
    box-shadow: 0px 0px 0px 1px black;
  }
`;

const Game = styled(Wrapper)`
  height: fit-content;
  width: fit-content;
  padding: 5px;
  background-color: #abc;
  border-radius: 5px;
  overflow: hidden;
`;

const App = (props) => {
  const [board, setBoard] = useState(initBoard(20, 20));
  const [w, setW] = useState(20);
  const [h, setH] = useState(20);
  const [click, setClick] = useState(1);

  useEffect(() => {
    setBoard(initBoard(w, h));
  }, [w, h]);

  const stopClicks = () => {
    setClick(0);
  };

  const handleClicks = (x, y) => {
    if (complete.call({ w, h }, board)) {
      alert("You Win!");
      setClick(0);
      return;
    }
    if (board[0][x][y] === 1) {
      alert("GAME OVER...");
    } else {
      let t = JSON.parse(JSON.stringify(board[2]));

      let xd = [1, 0, -1, 0, 1, 1, -1, -1];
      let yd = [0, -1, 0, 1, 1, -1, 1, -1];

      const check = (x, y) => {
        if (
          x >= 0 &&
          y >= 0 &&
          x < h &&
          y < w &&
          board[0][x][y] === 0 &&
          t[x][y] === 1
        )
          return true;
        return false;
      };

      let q = [[x, y]];
      t[x][y] = 0;
      if (board[1][x][y] === 0) {
        while (q.length !== 0) {
          console.log("in");
          let [cx, cy] = q[q.length - 1];
          q.pop();
          for (let i = 0; i < 8; i++) {
            if (check(xd[i] + cx, yd[i] + cy)) {
              t[xd[i] + cx][yd[i] + cy] = 0;
              if (board[1][xd[i] + cx][yd[i] + cy] === 0)
                q.unshift([xd[i] + cx, yd[i] + cy]);
            }
          }
        }
      }
      let newBoard = [
        JSON.parse(JSON.stringify(board[0])),
        JSON.parse(JSON.stringify(board[1])),
        t,
      ];
      setBoard(newBoard);
    }
  };

  const value = { handleClicks, stopClicks, click };

  return (
    <Wrapper flex col jc="center" al="center">
      <Reset
        onClick={() => {
          setBoard(initBoard(w, h));
          setClick(1);
        }}
        children="Reset"
      />
      <Game flex jc="center" al="center">
        <clickContext.Provider value={value}>
          <Table board={board} w={w} h={h} />
        </clickContext.Provider>
      </Game>
    </Wrapper>
  );
};

export default App;
