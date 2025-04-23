import { useState } from "react";

import "./App.css";

import { GameContainer, GameHeader } from "./components/gameBoard";
function App() {
  return (
    <>
      <header>
        <GameHeader />
      </header>
      <main>
        <GameContainer />
      </main>
    </>
  );
}

export default App;
