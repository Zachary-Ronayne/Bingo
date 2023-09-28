import { Row, Col } from "antd";
import { FC, useEffect, useState } from "react";
import { getSave, setSave } from "./BingoGame";

export interface BoardSpot{
  text: string;
  filled: boolean;
}

interface GridProps{
  width: number;
  height: number;
  words: string[];
  freeSpace: string;
}

export const KEY_BOARD = "board";

const Grid: FC<GridProps> = (props) => {
  const GRID_SIZE = 110;
  const TEXT_SCALER = 9000;
  const [board, setBoard] = useState<BoardSpot[][]>([]);
  
  useEffect(() => {
    // Get the current saved board
    let b = getSave(KEY_BOARD);
    // If there is no board yet, set it to empty
    if(!b) b = [];
    // If the current board is empty, init it
    if(b.length == 0) {
      b = initBoard();
      randomWords(b);
    }
    // Otherwise, just set the object
    else setBoard(b);
  }, [props]);

  // Both set the current board and save it to storage
  const updateBoard = (b: BoardSpot[][]) => {
    setBoard(b);
    setSave(KEY_BOARD, b);
  }
  
  const initBoard = () => {
    let newBoard: BoardSpot[][] = [];
    for(let y = 0; y < props.height; y++){
      newBoard.push([]);
      for(let x = 0; x < props.width; x++){
        newBoard[y].push({text: "", filled: false});
      }
    }
    return newBoard;
  }

  const resetSpaces = (board: BoardSpot[][]) => {
    let newBoard = [...board];
    for(let y = 0; y < props.height; y++){
      newBoard.push([]);
      for(let x = 0; x < props.width; x++){
        newBoard[x][y].filled = false;
      }
    }
    updateBoard(newBoard);
    return newBoard;
  }

  const randomWords = (board: BoardSpot[][]) => {
    // If the current board is empty, or the width or height are different, init it first
    if(board.length == 0 || (props.width != board.length || props.height != board[0].length)) board = initBoard();

    let newBoard = [...board];
    let remaining = [...props.words];
    for(let x = 0; x < props.height; x++){
      for(let y = 0; y < props.width; y++){
        newBoard[x][y].filled = false;
        // Check for free space
        if(Math.floor(props.height / 2) === x && Math.floor(props.width / 2) === y){
          newBoard[x][y].text = props.freeSpace;
          continue;
        }

        // If there are no more words, use blank
        if(remaining.length <= 0){
          newBoard[x][y].text = "";
          continue;
        }
        // Pick a random word and remove it from the list
        let i = Math.floor(Math.random() * remaining.length);
        newBoard[x][y].text = remaining[i];
        remaining.splice(i, 1);
      }
    }
    updateBoard(newBoard);
    return newBoard;
  }

  const toggleClicked = (x: number, y: number) => {
    let newBoard = [...board];
    newBoard[x][y].filled = !board[x][y].filled;
    updateBoard(newBoard);
  } 

  const findFontSize = (s: string) => {
    // TODO find a better way of doing this
    return Math.sqrt(TEXT_SCALER / s.length) + "px";
  }

  //  TODO abstract out styling
  return <>
    <Row>
      <div
        style={{
          fontSize: "29px", border: "2px solid #DDDDDD", background: "#222222", 
          width: "200px", textAlign: "center", color: "#DDDDDD", margin: "30px", padding: "20px"
        }}
        onClick={() => resetSpaces(board)}
      >
        RESET SPACES
      </div>
      <div
        style={{
          fontSize: "29px", border: "2px solid #DDDDDD", background: "#222222", 
          width: "200px", textAlign: "center", color: "#DDDDDD", margin: "30px", padding: "20px"
        }}
        onClick={() => randomWords(board)}
      >
        NEW BOARD
      </div>
    </Row>
    <div style={{overflowX: "auto", width: "max-content"}}>
      {board.map((row, x) => <Row >
        {row.map((col, y) => <Col>
          <div
            key={"grid_" + x + "_" + y}
            style={{
              border: "2px solid #DDDDDD", padding: "20px",
              background: col.filled ? "#BB0000" : "#222222", fontSize: "29px", color: "#DDDDDD",
              userSelect: "none",
              width: GRID_SIZE + "px", height: GRID_SIZE + "px"
            }}
            onClick={() => {
              toggleClicked(x, y);
            }}
          >
            <div style={{fontSize: findFontSize(col.text)}} key={"text_" + x + "_" + y}>
              {col.text}
            </div>
          </div>
        </Col>)}
      </Row>)
    }</div>
  </>;
};

export default Grid;
