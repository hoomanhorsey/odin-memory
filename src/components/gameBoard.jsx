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
  const tempBoard = createBoard(gameState, array, handleCardClick);

  // Listens for game over due to losing
  useEffect(() => {
    if (gameState.gamePhase === "gameLost") {
      handleGameLost();
    } else if (gameState.gamePhase === "gameWon") {
      handleGameWon();
    }
  }, [gameState.gamePhase]);

  function handleGameLost() {
    alert(
      "Sorry you've repeated yoursed! CONCENTRATE!!!! handleGameLost function called" +
        chosenCards
    );

    // gamePhase has been turned into idle....

    // show tryagain, Tray again with new cards?

    const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    updateGameStateFields(setGameState, {
      highScore: updatedHighScore,
      // gamePhase: "idle",
    });
    // if (gameState.gamePhase === "running") {
    //   console.log(updatedHighScore);
    //   alert("Wu-woah. You repeated yourself. Press start to try again");
    // }
  }
  function handleGameWon() {
    console.log(timer.elapsedTime);
    console.log(Math.min(timer.elapsedTime, timer.fastestTime));

    // console.log("game has been won");
    // alert("You won!!! ");
    // setTimer((prev) => ({
    //   ...prev,
    //   elapsedTime: 0,
    // }));

    const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    updateGameStateFields(setGameState, {
      highScore: updatedHighScore,
      // gamePhase: "idle",
    });

    console.log(
      "fastesttime: " + timer.fastestTime + " elapsedTime " + timer.elapsedTime
    );
    const updatedFastestTime =
      timer.fastestTime === null
        ? timer.elapsedTime
        : Math.min(timer.elapsedTime, timer.fastestTime);
    setTimer((prev) => ({ ...prev, fastestTime: updatedFastestTime }));
  }

  function handleCardClick(e) {
    const id = e.target.id;

    if (isRepeatedCard(chosenCards, id)) {
      console.log("Repeated");
      updateGameStateFields(setGameState, { gamePhase: "gameLost" });
    } else {
      setChosenCards([...chosenCards, e.target.id]);

      console.log(gameState.score);
      updateGameStateFields(setGameState, {
        score: (prevScore) => prevScore + 1,
      });
      console.log("No repeats: " + gameState.score);
      setArray(randomiseArrayOrder(array));

      if (gameState.score === 2) {
        console.log(Math.min(timer.elapsedTime, timer.fastestTime));

        updateGameStateFields(setGameState, { gamePhase: "gameWon" });
      }
    }
  }
  return (
    <>
      <div className="gameBoard"> {tempBoard}</div>
    </>
  );
}

function createBoard(gameState, array, handleCardClick) {
  const tempBoard = [];

  for (let i = 0; i < array.length; i++) {
    tempBoard.push(
      <div
        className="gameCard"
        key={array[i].id}
        id={array[i].id}
        onClick={gameState.gamePhase === "running" ? handleCardClick : null}
      >
        {/* This causes the array[id] to be displayed */}
        {array[i].id}
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
