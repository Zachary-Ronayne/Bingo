import { Row, Col } from "antd";
import { FC, useEffect, useState } from "react";

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

const Grid: FC<GridProps> = (props) => {

  const GRID_SIZE = 110;
  const TEXT_SCALER = 9000;
  const [board, setBoard] = useState<BoardSpot[][]>([]);

  useEffect(() => {
    randomWords(initBoard(board));
  }, [props]);

  const initBoard = (board: BoardSpot[][]) => {
    let newBoard: BoardSpot[][] = [];
    for(let y = 0; y < props.height; y++){
      newBoard.push([]);
      for(let x = 0; x < props.width; x++){
        newBoard[y].push({text: "", filled: false});
      }
    }
    setBoard(newBoard);
    return newBoard;
  }

  const randomWords = (board: BoardSpot[][]) => {
    let newBoard = [...board];
    let remaining = [...props.words];
    for(let x = 0; x < props.width; x++){
      for(let y = 0; y < props.height; y++){
        // Check for free space
        if(Math.floor(props.width / 2) === x && Math.floor(props.height / 2) === y){
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
    setBoard(newBoard);
    return newBoard;
  }

  const toggleClicked = (x: number, y: number) => {
    let newBoard = [...board];
    newBoard[x][y].filled = !board[x][y].filled;
    setBoard(newBoard);
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
        onClick={() => initBoard(board)}
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
    {board.map((row, x) => <Row>
      {row.map((col, y) => <Col>
        <div
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
          <div style={{fontSize: findFontSize(col.text)}}>
            {col.text}
          </div>
        </div>
      </Col>)}
    </Row>)
  }</>;
};

export default Grid;
