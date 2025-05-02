import React from "react";
import { useState, useEffect } from "react";

import { setupGame } from "./setup.jsx";
import { updateGameStateField } from "../utils/helpers.jsx";
import { GameHeader } from "./plainElements.jsx";

import { GameBoard, StartButton } from "./gameBoard.jsx";
import { Score, Timer } from "./scoring.jsx";
import { populateArrayWithImages } from "../utils/helpers.jsx";

//gamePhase, loading, idle, running, gameWon, gameLost

function GameContainer() {
  const [gameState, setGameState] = useState({
    score: 0,
    highScore: 0,
    gameOver: false,
    gameWon: false,
    gamePhase: "setup",
  });

  // setup game on Mount
  useEffect(() => {
    console.log("setup called");
    console.log("setupGame typeof setGameState:", typeof setGameState);
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

  useEffect(() => {
    console.log("gamePhase changed:", gameState.gamePhase);

    if (gameState.gamePhase === "idle") {
      // Do something when it enters loading
    }
  }, [gameState.gamePhase]);

  const [chosenCards, setChosenCards] = useState([]);
  // gamePhase can be 'idle', 'running', 'won', 'lost'

  const [timer, setTimer] = useState({
    elapsedTime: 0,
    fastestTime: null,
  });

  // const [loading, setLoading] = useState(true);

  const [array, setArray] = useState([]);
  console.log(gameState.gamePhase);
  return (
    <>
      {gameState.gamePhase !== "setup" && (
        <>
          <div>
            <StartButton
              setArray={setArray}
              gameState={gameState}
              setGameState={setGameState}
              // chosenCards={chosenCards}
              // setChosenCards={setChosenCards}
              setTimer={setTimer}
              timer={timer}
            />
          </div>
          <div className="scorePanel">
            <Score score={gameState.score} highScore={gameState.highScore} />
          </div>
          <div>
            <Timer gameState={gameState} timer={timer} setTimer={setTimer} />
          </div>

          <div className="gameBoard">
            <GameBoard
              // loading={loading}
              // setLoading={setLoading}
              gameState={gameState}
              setGameState={setGameState}
              array={array}
              setArray={setArray}
              // chosenCards={chosenCards}
              // setChosenCards={setChosenCards}
              timer={timer}
              setTimer={setTimer}
            />
          </div>
        </>
      )}
    </>
  );
}

export { GameContainer, GameHeader };
