import { useState } from "react";

import "./App.css";

import { GameContainer } from "./components/gameBoard";
function App() {
  return (
    <>
      <header>
        <div>
          <h1>Memory Game</h1>
        </div>
      </header>
      <main>
        <div className="gameBoard">{/* <GameBoardRender /> */}</div>
        <div>
          <GameContainer />
        </div>
        <div>{/* <ImagePlay /> */}</div>
      </main>
    </>
  );
}

export default App;
