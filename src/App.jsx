import { useState } from "react";

import "./App.css";

import { GameBoardRender, GameContainer } from "./components/gameBoard";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <div>
          <h1>Memory Game</h1>
        </div>
        <div className="scoreBoard">
          <h2>Score</h2>
          <div>Score: </div>
          <div>Best Score</div>
        </div>
      </header>
      <main>
        <div className="gameBoard">{/* <GameBoardRender /> */}</div>
        <div>
          <GameContainer />
        </div>

        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
