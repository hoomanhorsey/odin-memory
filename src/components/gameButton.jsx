import { useState } from "react";

import { updateGameStateField, updateGameStateFields } from "../utils/helpers";
import { randomiseArrayOrder, populateArrayWithImages } from "../utils/helpers";

function GameButton({
  gameState,
  setGameState,
  setTimer,
  setChosenCards,
  array,
  setArray,
}) {
  async function handleGameButton(option) {
    console.log("called handle Game: " + option);

    if (option === "start") {
      setArray(randomiseArrayOrder(array));
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
    } else if (option === "restart") {
      setTimer((prev) => ({
        ...prev,
        elapsedTime: 0,
      }));
      // change in state results in: makes cards inactive, pauses timer
      updateGameStateFields(setGameState, {
        score: 0,
        gamePhase: "idle",
      });
    } else if (option === "restartNewCats") {
      updateGameStateFields(setGameState, {
        score: 0,
        gamePhase: "setup",
      });
      console.log("restart with new cats");
      setTimer((prev) => ({
        ...prev,
        elapsedTime: 0,
      }));

      const newArray = await populateArrayWithImages(setGameState);
      setArray(newArray);
      // change in state results in: makes cards inactive, pauses timer
      //   updateGameStateFields(setGameState, {
      //     score: 0,
      //     gamePhase: "setup",
      //   });
      updateGameStateField(setGameState, "gamePhase", "idle");
    }
  }

  if (gameState.gamePhase === "idle") {
    return (
      <>
        <button
          onClick={() => handleGameButton("start", setChosenCards)}
          className="gameBtn"
        >
          Start
        </button>
      </>
    );
  } else if (gameState.gamePhase === "running") {
    return (
      <>
        <button onClick={() => handleGameButton("restart")} className="gameBtn">
          Restart
        </button>
      </>
    );
  } else if (
    gameState.gamePhase === "gameLost" ||
    gameState.gamePhase === "gameWon"
  ) {
    return (
      <>
        <button onClick={() => handleGameButton("restart")} className="gameBtn">
          Try Again
        </button>
        <button
          onClick={() => handleGameButton("restartNewCats")}
          className="gameBtn"
        >
          Try Again with a different catos
        </button>
      </>
    );
  }
}

export { GameButton };

function OldgameButton({
  setArray,
  gameState,
  setGameState,
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

function handleStartButton(setChosenCards) {
  // if (loading) return; // <-- prevent starting while loading
  // if (option === 2) {
  //   console.log("new catos need to be retriefed");
  //   const newCats = populateArrayWithImages(setLoading);
  //   setArray(newCats);
  // }
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
