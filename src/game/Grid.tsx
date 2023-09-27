import { Row, Col } from "antd";
import { FC, useEffect, useState } from "react";

export interface BoardSpot{
  text: string;
  filled: boolean;
}

interface GridProps{
  width: number;
  height: number;
}

const Grid: FC<GridProps> = (props) => {

  const [board, setBoard] = useState<BoardSpot[][]>([]);

  useEffect(() => {
    initBoard();
  }, [props]);

  const initBoard = () => {
    let newBoard: BoardSpot[][] = [];
    for(let y = 0; y < props.height; y++){
      newBoard.push([]);
      for(let x = 0; x < props.width; x++){
        newBoard[y].push({text: "", filled: false});
      }
    }
    setBoard(newBoard);
  }

  const toggleClicked = (x: number, y: number) => {
    let newBoard = [...board];
    newBoard[x][y].filled = !board[x][y].filled;
    setBoard(newBoard);
  } 

  return <>
    <div
      style={{
        fontSize: "29px", border: "2px solid #DDDDDD", background: "#222222", 
        width: "100px", textAlign: "center", color: "#DDDDDD", margin: "30px", padding: "20px"
      }}
      onClick={initBoard}
    >
      RESET
    </div>
    {board.map((row, x) => <Row>
      {row.map((col, y) => <Col>
        {/* TODO abstract out styling */}
        <div
          style={{
            border: "2px solid #DDDDDD", padding: "10px",
            background: col.filled ? "#DD0000" : "#222222", fontSize: "29px", color: "#DDDDDD"
          }}
          onClick={() => {
            toggleClicked(x, y);
          }}
        >
          a
        </div>
      </Col>)}
    </Row>)
  }</>;
};

export default Grid;
