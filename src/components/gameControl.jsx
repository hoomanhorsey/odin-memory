import React from "react";
import { useState, useEffect } from "react";

import { setupGame } from "./setup.jsx";

import { LoadingScreen } from "./loading.jsx";
import { GameUI } from "./gameUI.jsx";
import { updateGameStateField } from "../utils/helpers.jsx";

import { populateArrayWithImages } from "../utils/helpers.jsx";

function GameContainer() {
  const [array, setArray] = useState([]);

  // gameState state variable
  const [gameState, setGameState] = useState({
    score: 0,
    highScore: 0,
    gameOver: false,
    gameWon: false,
    gamePhase: "setup",
  });
  console.table(array);
  // setup game on Mount
  useEffect(() => {
    const runSetup = async () => {
      await setupGame(
        updateGameStateField,
        setGameState,
        setArray,
        populateArrayWithImages
      );
    };
    runSetup();
  }, []);
  console.table(array);

  return (
    <>
      {gameState.gamePhase === "setup" ? (
        <LoadingScreen />
      ) : (
        <GameUI gameState={gameState} array={array} setArray={setArray} />
      )}

      <div>{gameState.gamePhase}</div>

      <div></div>
    </>
  );
}

export { GameContainer };
