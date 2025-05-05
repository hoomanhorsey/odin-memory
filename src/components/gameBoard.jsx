// import { handleCardClick } from "./gameLogic";
import { updateGameStateFields } from "../utils/helpers";
import { isRepeatedCard } from "./gameLogic";
import { randomiseArrayOrder } from "../utils/helpers";
import { useEffect } from "react";

function GameBoard({
  gameState,
  setGameState,
  array,
  setArray,
  chosenCards,
  setChosenCards,
  timer,
  setTimer,
}) {
  const tempBoard = createBoard(
    gameState,
    array,
    handleCardClick,
    handleCareWhenIdle
  );

  // Listens for game over due to losing
  useEffect(() => {
    if (gameState.gamePhase === "gameLost") {
      handleGameLost();
    } else if (gameState.gamePhase === "gameWon") {
      handleGameWon();
    }
  }, [gameState.gamePhase]);

  function handleGameLost() {
    const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    updateGameStateFields(setGameState, {
      highScore: updatedHighScore,
    });
  }
  function handleGameWon() {
    const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    updateGameStateFields(setGameState, {
      highScore: updatedHighScore,
    });
    const updatedFastestTime =
      timer.fastestTime === null
        ? timer.elapsedTime
        : Math.min(timer.elapsedTime, timer.fastestTime);
    setTimer((prev) => ({ ...prev, fastestTime: updatedFastestTime }));
  }

  function handleCardClick(e) {
    const id = e.target.id;

    if (isRepeatedCard(chosenCards, id)) {
      // console.log("Repeated");
      updateGameStateFields(setGameState, { gamePhase: "gameLost" });
    } else {
      setChosenCards([...chosenCards, e.target.id]);
      updateGameStateFields(setGameState, {
        score: (prevScore) => prevScore + 1,
      });
      // console.log("No repeats: " + gameState.score);
      setArray(randomiseArrayOrder(array));

      if (gameState.score === 6) {
        // console.log(Math.min(timer.elapsedTime, timer.fastestTime));
        updateGameStateFields(setGameState, { gamePhase: "gameWon" });
      }
    }
  }

  function handleCareWhenIdle() {
    alert("Press 'Start Timer' to start game");
  }
  return (
    <>
      <div className="gameBoard"> {tempBoard}</div>
    </>
  );
}

function createBoard(gameState, array, handleCardClick, handleCardWhenIdle) {
  const tempBoard = [];

  for (let i = 0; i < array.length; i++) {
    tempBoard.push(
      <div
        className="gameCard"
        key={array[i].id}
        id={array[i].id}
        onClick={
          gameState.gamePhase === "running"
            ? handleCardClick
            : handleCardWhenIdle
        }
      >
        {/* Display array[id] for gameTestingchecking*/}
        {/* {array[i].id} */}
        <img
          className={`catImage ${
            gameState.gamePhase === "running" ? "hoverEnabled" : ""
          }`}
          id={array[i].id}
          src={array[i].url}
        ></img>
      </div>
    );
  }
  return tempBoard;
}

export { GameBoard };
