import Grid from "./Grid";

const BingoGame = () => {
  document.title = "BINGO";
  return <>
    <div style={{padding: "20px", fontSize: "80px", border: "2px solid #DDDDDD", background: "#222222", color: "#DDDDDD"}}>
      BINGO
    </div>
    <Grid
      width={5}
      height={5}
    />
  </>;
}

export default BingoGame;
