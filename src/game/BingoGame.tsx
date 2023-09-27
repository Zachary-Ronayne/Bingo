import Grid from "./Grid";

const BingoGame = () => {
  document.title = "BINGO";
  return <div style={{textAlign: "center", margin: "20px"}}>
    <div
      style={{
        padding: "20px", fontSize: "80px", border: "2px solid #DDDDDD", background: "#222222", color: "#DDDDDD",
        width: "600px"
      }}
    >
      BINGO
    </div>
    <Grid
      width={5}
      height={5}
      words={[
      ]}
      freeSpace="(FREE SPACE)"
    />
  </div>;
}

export default BingoGame;
