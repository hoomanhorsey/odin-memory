import React from "react";
import { useState, useEffect } from "react";

import { setupGame } from "./setup.jsx";

import { LoadingScreen } from "./loading.jsx";
import { GameUI } from "./gameUI.jsx";
import { updateGameStateFields } from "../utils/helpers.jsx";

import { populateArrayWithImages } from "../utils/helpers.jsx";

function GameContainer() {
  const [array, setArray] = useState([]);

  // gameState state variable
  // gamePhase options: setup, idle, running, gameWon, gameLost
  const [gameState, setGameState] = useState({
    score: 0,
    highScore: 0,
    gamePhase: "setup",
  });

  // setup game on Mount
  useEffect(() => {
    const runSetup = async () => {
      await setupGame(
        updateGameStateFields,
        setGameState,
        setArray,
        populateArrayWithImages
      );
    };
    runSetup();
  }, []);

  return (
    <>
      {/* <div>gamePhase: {gameState.gamePhase} **To be deleted</div> */}

      {gameState.gamePhase === "setup" ? (
        <LoadingScreen />
      ) : (
        <GameUI
          gameState={gameState}
          setGameState={setGameState}
          array={array}
          setArray={setArray}
        />
      )}
    </>
  );
}

export { GameContainer };
