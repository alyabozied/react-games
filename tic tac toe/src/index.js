import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
function Square(props) {
  let font;
  if (props.value === "X") font = "red";
  if (props.value === "O") font = "blue";
  return (
    <button
      className="square"
      place={props.place}
      color={font}
      onClick={
        () => {
          props.updateBoard(props.place);
        }
        //  props.updateBoard(props.place)
      }
    >
      {props.value}
    </button>
  );
}
function Row(props) {
  return (
    <div className="row">
      <Square
        updateBoard={props.updateBoard}
        place={props.place[0]}
        value={props.values[0]}
      />
      <Square
        updateBoard={props.updateBoard}
        place={props.place[1]}
        value={props.values[1]}
      />
      <Square
        updateBoard={props.updateBoard}
        place={props.place[2]}
        value={props.values[2]}
      />
    </div>
  );
}
function Board() {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(" "));
  const [winner, setWinner] = useState(" ");
  function updateBoard(place) {
    let currentState = board.slice();
    if (currentState[place] != " " || winner != " ") return;
    currentState[place] = player;
    setBoard(currentState);
    player === "X" ? setPlayer("O") : setPlayer("X");
    checkWinner(currentState);
  }
  function checkWinner(board) {
    //rows
    for (let i = 0; i < 9; i += 3) {
      console.log();
      if (
        board[i] === board[i + 1] &&
        board[i] === board[i + 2] &&
        (board[i] === "X" || board[i] === "O")
      ) {
        setWinner(board[i]);
        console.log(board[i]);
        return;
      }
    }
    //coloumns
    for (let i = 0; i < 3; i++) {
      if (
        board[i] === board[i + 3] &&
        board[i] === board[i + 6] &&
        (board[i] === "X" || board[i] === "O")
      ) {
        setWinner(board[i]);
        return;
      }
    }
    //diagonals
    if (
      board[0] === board[4] &&
      board[0] === board[8] &&
      (board[0] === "X" || board[0] === "O")
    ) {
      setWinner(board[0]);
      return;
    }
    if (
      board[2] === board[4] &&
      board[2] === board[6] &&
      (board[2] === "X" || board[2] === "O")
    ) {
      setWinner(board[2]);
      return;
    }
    if (
      !board.find(Element => {
        return Element === " ";
      })
    ) {
      setWinner("Draw");
      return;
    }
  }
  function clear() {
    setWinner(" ");
    setPlayer("X");
    setBoard(Array(9).fill(" "));
  }
  let printWinner;
  if (winner !== " " && winner !== "Draw") {
    printWinner = (
      <div>
        <div>player {winner} won</div>
        <button
          onClick={() => {
            clear();
          }}
        >
          Clear
        </button>
      </div>
    );
  } else if (winner === "Draw") {
    printWinner = (
      <div>
        <div>Draw</div>
        <button
          onClick={() => {
            clear();
          }}
        >
          Clear
        </button>
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1>player {player} turn </h1>
      </div>
      <Row
        updateBoard={updateBoard}
        place={[0, 1, 2]}
        values={board.slice(0, 3)}
      />
      <Row
        updateBoard={updateBoard}
        place={[3, 4, 5]}
        values={board.slice(3, 6)}
      />
      <Row
        updateBoard={updateBoard}
        place={[6, 7, 8]}
        values={board.slice(6, 9)}
      />

      <div>{printWinner}</div>
    </div>
  );
}

function Game() {
  return (
    <div>
      <Board />
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));
