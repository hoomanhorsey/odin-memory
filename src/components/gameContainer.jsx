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
    gamePhase: "idle",
  });

  const [chosenCards, setChosenCards] = useState([]);
  // gamePhase can be 'idle', 'running', 'won', 'lost'

  const [timer, setTimer] = useState({
    elapsedTime: 0,
    fastestTime: "No successful attempts",
  });

  const [loading, setLoading] = useState(true);

  const [array, setArray] = useState([]);

  return (
    <>
      <div>
        <StartButton
          setArray={setArray}
          gameState={gameState}
          setGameState={setGameState}
          loading={loading}
          setLoading={setLoading}
          chosenCards={chosenCards}
          setChosenCards={setChosenCards}
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
          loading={loading}
          setLoading={setLoading}
          gameState={gameState}
          setGameState={setGameState}
          array={array}
          setArray={setArray}
          chosenCards={chosenCards}
          setChosenCards={setChosenCards}
          timer={timer}
          setTimer={setTimer}
        />
      </div>
    </>
  );
}

export { GameContainer, GameHeader };
