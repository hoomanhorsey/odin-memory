import { useState } from "react";

import { GameBoard } from "./gameBoard";
import { GameButton } from "./gameButton";

import { Score, Timer } from "./scoring";

import { GameEndMessage } from "./gameMessages";

function GameUI({ gameState, setGameState, array, setArray }) {
  const [chosenCards, setChosenCards] = useState([]);
  const [timer, setTimer] = useState({
    elapsedTime: 5,
    fastestTime: null,
  });

  return (
    <>
      version 1.1
      {gameState.gamePhase !== "setup" && (
        <>
          <div>
            <GameEndMessage gameState={gameState} />
          </div>
          <div>
            <GameButton
              gameState={gameState}
              setGameState={setGameState}
              setChosenCards={setChosenCards}
              array={array}
              setArray={setArray}
            />
          </div>

          <div className="scorePanel">
            <Score gameState={gameState} />
          </div>

          <div className="timerPanel">
            <Timer gameState={gameState} timer={timer} setTimer={setTimer} />
          </div>

          <div className="gameBoard">
            <GameBoard
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
      )}
    </>
  );
}

export { GameUI };
