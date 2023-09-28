import { Collapse, Input } from "antd";
import Grid from "./Grid";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
const { Panel } = Collapse;

export const KEY_TITLE = "title";
export const KEY_FREE_SPACE = "freeSpace";
export const KEY_WORDS = "words";
export const KEY_HEIGHT = "height";
export const KEY_WIDTH = "width";

interface SaveValue{
  d: any;
  set: (value: any) => void;
}

export const getSave = (key: string) => {
  return JSON.parse(localStorage.getItem(key));
}

export const setSave = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const BingoGame = () => {
  document.title = "BINGO";

  const [words, setWords] = useState<string[]>([]);
  const [freeSpace, setFreeSpace] = useState<string>("");
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [wordsText, setWordsText] = useState<string>("");

  const saveKeys = {};
  saveKeys[KEY_TITLE] = {set: setTitle, d: "BINGO"};
  saveKeys[KEY_FREE_SPACE] = {set: setFreeSpace, d: "(FREE SPACE)"};
  saveKeys[KEY_WORDS] = {set: w => {
    setWords(w);
    setWordsText(w.join("\n"));
  }, d: []};
  saveKeys[KEY_WIDTH] = {set: setWidth, d: 5};
  saveKeys[KEY_HEIGHT] = {set: setHeight, d: 5};
  
  const updateKey = (key: string, value: any) => {
    saveKeys[key].set(value);
    setSave(key, value);
  }

  useEffect(() => {
    Object.keys(saveKeys).forEach(k => {
      let value = getSave(k);
      let setting: SaveValue = saveKeys[k];
      if(value == null) {
        value = setting.d;
        setSave(k, value);
      }
      setting.set(value);
    })
  }, []);

  const simpleInput = (key: string, value: any) => <Input value={value} onChange={e => updateKey(key, e?.target?.value ?? "")}/>

  return <div style={{textAlign: "center", margin: "40px"}}>
    <div
      style={{
        padding: "20px 50px 20px 50px", fontSize: "80px", border: "2px solid #DDDDDD", background: "#222222", color: "#DDDDDD",
        display: "inline-block",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {title}
    </div>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Grid
        width={width}
        height={height}
        words={words}
        freeSpace={freeSpace}
      />
    </div>
    <div style={{padding: "150px"}} />

    {/* TODO style this */}
    <Collapse style={{fontSize: "20px", border: "2px solid #DDDDDD", background: "#DDDDDD", width: "1200px"}}>
      <Panel header="Options" key="options">
        Terms
        <TextArea rows={10} value={wordsText} onChange={e => {
          let s = e?.target?.value ?? "";
          setWordsText(s);
          updateKey(KEY_WORDS, s.split("\n"));
        }} />
        Free space
        {simpleInput(KEY_FREE_SPACE, freeSpace)}
        Title
        {simpleInput(KEY_TITLE, title)}
        Width
        {simpleInput(KEY_WIDTH, width)}
        Height
        {simpleInput(KEY_HEIGHT, height)}
      </Panel>
    </Collapse>
  </div>;
}

export default BingoGame;
