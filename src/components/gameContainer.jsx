import React from "react";
import { useState, useEffect } from "react";

import { GameHeader } from "./plainElements.jsx";

import { GameBoard, StartButton } from "./gameBoard.jsx";
import { Score, Timer } from "./scoring.jsx";

function GameContainer() {
  const [gameState, setGameState] = useState({
    score: 0,
    highScore: 0,
    gameOver: false,
    gameWon: false,
    gameReset: false,
    gameStarted: false,
  });

  const [elapsedTime, setElapsedTime] = useState(0);

  const [gameReset, setGameReset] = useState(false);

  return (
    <>
      <div>
        <StartButton
          gameStarted={gameState.gameStarted}
          setGameState={setGameState}
        />
      </div>
      <div className="scorePanel">
        <Score score={gameState.score} highScore={gameState.highScore} />
      </div>
      <div>
        <Timer elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} />
      </div>
      <div className="gameBoard">
        <GameBoard
          // gameReset={gameReset}
          // setGameReset={setGameReset}
          gameState={gameState}
          setGameState={setGameState}
        />
      </div>
    </>
  );
}

export { GameContainer, GameHeader };
