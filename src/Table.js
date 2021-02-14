import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { clickContext } from "./Context";

const Colors = [
  null,
  "#1345ba",
  "#37b50d",
  "#cc2e0e",
  "#b81f00",
  "#910c03",
  "#730700",
  "#520601",
  "#0a0100",
];

const NumberCol = styled.p`
  color: ${(props) => Colors[props.num]};
  font-weight: bolder;
  cursor: default;
  font-size: 1rem;
`;

const Dot = styled.div`
  height: 7px;
  width: 7px;
  background-color: black;
  border-radius: 50%;
`;

const Td = ({ className, Context, i, j, val, hover, covered }) => {
  const [flag, setFlag] = useState(0);
  if (i === 0 && j === 0) {
    console.log(Context);
  }

  let maybeStyle = {};
  if (Context.click === 1 && covered === 0) {
    maybeStyle.style = { backgroundColor: "gray" };
  } else if (Context.click === 1 && flag === 1) {
    maybeStyle.style = { backgroundColor: "red" };
  }

  let render;
  if (Context.click === 0) {
    render = val === 1 ? <Dot /> : hover;
  } else {
    if (covered === 1) {
      render = "";
    } else if (covered === 0) {
      render = hover;
    }
  }

  return (
    <td
      onClick={(e) => {
        if (Context.click === 0) {
          return;
        }
        if (val === 1) {
          Context.stopClicks();
          alert("Game Over");
        } else {
          Context.handleClicks(i, j);
        }
        e.stopPropagation();
      }}
      {...maybeStyle}
      className={className}
      onContextMenu={(e) => {
        if (Context.click === 0) {
          return;
        }
        console.log(`${i},${j}`);
        setFlag((p) => (p === 0 ? p + 1 : p - 1));
        e.preventDefault();
      }}
    >
      {render === 0 ? (
        ""
      ) : Number.isInteger(render) ? (
        <NumberCol children={render} num={render} />
      ) : (
        render
      )}
    </td>
  );
};

const StyledTd = styled(Td)`
  background-color: ${(props) => {
    return props.dis === 0 ? "rgba(105,105,105,0.7)" : `rgba(240,240,240,1)`;
  }};
  width: ${(props) => props.w || "20px"};
  height: ${(props) => props.w || "20px"};
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: 0px 2px;
  transition-duration: 150ms;
  align-items: center;
  font-size: 0.9rem;
  text-align: center;
  flex-shrink: 0px;
  @media all and (max-width: 450px) {
    & {
      width: 2vw;
      height: 2vh;
    }
  }
`;

const Table = ({ w, h, board }) => {
  const Context = useContext(clickContext);

  const cells = [];
  for (let i = 0; i < h; i++) {
    let t = [];
    for (let j = 0; j < w; j++) {
      t.push(
        <StyledTd
          dis={Context.click}
          Context={Context}
          val={board[0][i][j]}
          hover={board[1][i][j]}
          covered={board[2][i][j]}
          i={i}
          j={j}
        ></StyledTd>
      );
    }
    cells.push(<tr>{t}</tr>);
  }

  return (
    <table
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <tbody>{cells}</tbody>
    </table>
  );
};

export default Table;
