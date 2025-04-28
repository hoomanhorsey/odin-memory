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
    gameStarted: false,
    gameStatus: "idle",
  });

  // gameStatus can be 'idle', 'running', 'won', 'lost'
  const [elapsedTime, setElapsedTime] = useState(0);

  const [array, setArray] = useState([]);

  return (
    <>
      <div>
        <StartButton
          gameStarted={gameState.gameStarted}
          gameState={gameState}
          setGameState={setGameState}
        />
      </div>
      <div className="scorePanel">
        <Score score={gameState.score} highScore={gameState.highScore} />
      </div>
      <div>
        <Timer
          gameState={gameState}
          elapsedTime={elapsedTime}
          setElapsedTime={setElapsedTime}
        />
      </div>
      <div className="gameBoard">
        <GameBoard
          gameState={gameState}
          setGameState={setGameState}
          array={array}
          setArray={setArray}
        />
      </div>
    </>
  );
}

export { GameContainer, GameHeader };
