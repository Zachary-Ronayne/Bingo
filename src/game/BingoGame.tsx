import { Collapse, Input } from "antd";
import Grid from "./Grid";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
const { Panel } = Collapse;

const BingoGame = () => {
  document.title = "BINGO";

  const [words, setWords] = useState<string[]>([]);
  const [wordsText, setWordsText] = useState<string>("");
  const [freeSpace, setFreeSpace] = useState<string>("(FREE SPACE)");
  const [title, setTitle] = useState<string>("BINGO");

  return <div style={{textAlign: "center", margin: "20px"}}>
    <div
      style={{
        padding: "20px", fontSize: "80px", border: "2px solid #DDDDDD", background: "#222222", color: "#DDDDDD",
        width: "800px"
      }}
    >
      {title}
    </div>
    <Grid
      width={5}
      height={5}
      words={words}
      freeSpace={freeSpace}
    />
    <br/>
    <div style={{padding: "150px"}} />
    <br/>

    {/* TODO style this */}
    {/* TODO store this state in the local storage */}
    <Collapse style={{fontSize: "20px", border: "2px solid #DDDDDD", background: "#DDDDDD", color: "#DDDDDD"}}>
      <Panel header="Options" key="options">
        Terms
        <TextArea rows={10} value={wordsText} onChange={e => {
          let s = e?.target?.value ?? "";
          setWordsText(s);
          setWords(s.split("\n"));
        }} />
        Free space
        <Input value={freeSpace} onChange={e => setFreeSpace(e?.target?.value ?? "")}/>
        Title
        <Input value={title} onChange={e => setTitle(e?.target?.value ?? "")}/>
      </Panel>
    </Collapse>
  </div>;
}

export default BingoGame;
