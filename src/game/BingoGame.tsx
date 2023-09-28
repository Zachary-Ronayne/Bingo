import { Collapse, Input } from "antd";
import Grid from "./Grid";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
const { Panel } = Collapse;

export const KEY_TITLE = "title";
export const KEY_FREE_SPACE = "freeSpace";
export const KEY_WORDS = "words";

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

  const [wordsText, setWordsText] = useState<string>("");

  const saveKeys = {};
  saveKeys[KEY_TITLE] = {set: setTitle, d: "BINGO"};
  saveKeys[KEY_FREE_SPACE] = {set: setFreeSpace, d: "(FREE SPACE)"};
  saveKeys[KEY_WORDS] = {set: w => {
    setWords(w);
    setWordsText(w.join("\n"));
  }, d: []};
  
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
          updateKey(KEY_WORDS, s.split("\n"));
        }} />
        Free space
        <Input value={freeSpace} onChange={e => updateKey(KEY_FREE_SPACE, e?.target?.value ?? "")}/>
        Title
        <Input value={title} onChange={e => updateKey(KEY_TITLE, e?.target?.value ?? "")}/>
      </Panel>
    </Collapse>
  </div>;
}

export default BingoGame;
