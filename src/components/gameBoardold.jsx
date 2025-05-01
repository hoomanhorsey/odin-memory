import { useState, useEffect } from "react";
import { isRepeatedCard } from "./gameLogic.jsx";
import {
  randomiseArrayOrder,
  populateArrayWithImages,
  updateGameStateField,
  updateGameStateFields,
} from "../utils/helpers.jsx";

function StartButton({
  setArray,
  gameState,
  setGameState,
  loading,
  setLoading,
  setChosenCards,
  timer,
  setTimer,
}) {
  async function handleStartButton(option) {
    // if (loading) return; // <-- prevent starting while loading
    if (option === 2) {
      console.log("new catos need to be retriefed");
      const newCats = await populateArrayWithImages(setLoading);
      setArray(newCats);
    }
    console.log("pressing start");

    console.table(gameState);

    setChosenCards([]); // Resets selected cards for new round
    // Resets timer counter
    setTimer((prev) => ({
      ...prev,
      elapsedTime: 0,
    }));

    // Setting gamePhase to 'running' triggers:
    // - Randomizing the game cards (via useEffect in main board)
    // - Enabling card clicks (by conditional 'onClick' in createBoard)
    // - Starting the timer (via Timer component's useEffect)

    // change in state results in:
    // gamePhase to 'running' - randomised card array, makes cards active, starts timer
    updateGameStateFields(setGameState, {
      score: 0,
      gameWon: false,
      gamePhase: "running",
    });
  }

  function handleResetButton() {
    console.log("pressing reset");
    console.table(gameState);

    setTimer((prev) => ({
      ...prev,
      elapsedTime: 0,
    }));
    // change in state results in: makes cards inactive, pauses timer
    updateGameStateFields(setGameState, {
      score: 0,
      // gamePhase: "idle",
    });
  }

  if (gameState.gamePhase === "idle") {
    return (
      <>
        <button onClick={() => handleStartButton(1)} className="startBtn">
          Start
        </button>
      </>
    );
  }
  if (gameState.gameWon === true) {
    return (
      <>
        <button onClick={() => handleStartButton(1)} className="startBtn">
          Restart
        </button>

        <button onClick={() => handleStartButton(2)} className="startBtn">
          Restart with different cats
        </button>
      </>
    );
  } else {
    return (
      <>
        <button onClick={handleResetButton} className="startBtn">
          Reset
        </button>
      </>
    );
  }
}

function GameBoard({
  gameState,
  setGameState,
  // loading,
  // setLoading,
  array,
  setArray,
  chosenCards,
  setChosenCards,
  timer,
  setTimer,
}) {
  // Initial gameBoard setup with fresh fetched urls
  // NOTE: SHould this be lifted to the game container????

  //!!!!!!!! Previous set up function!!!!//////

  // useEffect(() => {
  //   async function fetchGifs() {
  //     const tempArray = await populateArrayWithImages(setGameState);
  //     setArray(tempArray);
  //     console.log("fetch urls effect called");
  //   }
  //   fetchGifs();
  // }, []); //Launches on mount only.

  // Listens for game over due to losing
  useEffect(() => {
    handleGameLost();
  }, [gameState.gameOver]);

  // Listens for game win.
  useEffect(() => {
    if (gameState.gameWon) {
      console.log(
        "game has won this is from effect - gamewon value: " + gameState.gameWon
      );
      handleGameWon();
    } else {
      console.log(
        "gameWon effect has been called but not logic operates as gameWon is " +
          gameState.gameWon
      );
    }
  }, [gameState.gameWon]);

  // Randomises cards
  // useEffect(() => {
  //   if (gameState.gamePhase === "running") {
  //     setArray((prevArray) => randomiseArrayOrder(prevArray));
  //   }
  // }, [gameState.gamePhase]);

  function handleGameLost() {
    // const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    // // setChosenCards([]);
    // updateGameStateFields(setGameState, {
    //   gameOver: false,
    //   score: 0,
    //   highScore: updatedHighScore,
    //   // gamePhase: "idle",
    // });
    // if (gameState.gamePhase === "running") {
    //   console.log(updatedHighScore);
    //   alert("Wu-woah. You repeated yourself. Press start to try again");
    // }
  }
  function handleGameWon() {
    console.log("game has been won");
    alert("You won!!! ");

    setTimer((prev) => ({
      ...prev,
      elapsedTime: 0,
    }));
    const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    console.log(updatedHighScore);
    updateGameStateFields(setGameState, {
      highScore: updatedHighScore,
      // gamePhase: "idle",
    });

    console.log(
      "fastesttime: " + timer.fastestTime + " elapsedTime " + timer.elapsedTime
    );

    const updatedFastestTime =
      timer.fastestTime === "No successful attempts"
        ? timer.elapsedTime
        : Math.min(timer.elapsedTime, timer.fastestTime);
    console.log(Math.min(timer.elapsedTime, timer.fastestTime));
    setTimer((prev) => ({ ...prev, fastestTime: updatedFastestTime }));
  }

  function handleCardClick(e) {
    const id = e.target.id;

    if (isRepeatedCard(chosenCards, id)) {
      console.log("Repeated");
      updateGameStateField(setGameState, "gamePhase", "idle");
      alert("gamelost");
    } else {
      setChosenCards([...chosenCards, e.target.id]);
      updateGameStateField(setGameState, "score", (prevScore) => prevScore + 1);
      console.log("No repeats: " + gameState.score);
      setArray(randomiseArrayOrder(array));

      if (gameState.score === 2) {
        updateGameStateField(setGameState, "gameWon", true);
      }
    }
  }

  const board = createBoard(gameState, array, handleCardClick);
  console.log(gameState.gamePhase);
  return (
    <>
      {gameState.gamePhase === "setup" ? (
        <div className="loadingElement">
          <div>You please wait!</div>
          <div>
            <h3 className="loading-text">Computer is herding random catos </h3>
          </div>
        </div>
      ) : (
        <>{board}</>
      )}
    </>
  );

  // return <>{board}</>;
}

function createBoard(gameState, array, handleCardClick) {
  const board = [];

  for (let i = 0; i < array.length; i++) {
    board.push(
      <div
        className="gameCard"
        key={array[i].id}
        id={array[i].id}
        onClick={gameState.gamePhase === "running" ? handleCardClick : null}
      >
        {" "}
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
  return board;
}

export { GameBoard, StartButton };
