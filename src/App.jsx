import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { getRandomArray } from "./components/randomArray";

import { GameBoardRender } from "./components/gameBoard";
function App() {
  const [count, setCount] = useState(0);

  const array = getRandomArray();

  return (
    <>
      <div>
        <h1>Memory Game</h1>
      </div>
      <div className="gameBoard">
        <GameBoardRender array={array} />
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
