import BingoGame from "./game/BingoGame";
import "./index.css"

const App: any = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <BingoGame />
  </div>
);

export default App;
