import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { getRandomArray } from "./utils/helpers";

import { GameBoardRender } from "./components/gameBoard";
function App() {
  const [count, setCount] = useState(0);

  const array = getRandomArray();

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
        <div className="gameBoard">
          <GameBoardRender array={array} />
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
