import { Row, Col } from "antd";
import { useState } from "react";

const Grid = () => {

  const [board, setBoard] = useState<any[][]>([["a"]]);

  return <>
    <div onClick={() => setBoard([["b"]])}> a</div>
    <Row>
      <Col>BINGO</Col>
    </Row>
    {board[0]}
  </>;
};

export default Grid;
