import { useState, useEffect } from "react";
import { isRepeatedCard } from "./gameLogic.jsx";
import {
  randomiseArrayOrder,
  populateArrayWithImages,
  updateGameStateField,
  updateGameStateFields,
} from "../utils/helpers.jsx";

function StartButton({
  gameState,
  setGameState,
  setElapsedTime,
  setChosenCards,
}) {
  function handleStartButton() {
    console.log("pressing start");

    setChosenCards([]); // Resets selected cards for new round
    setElapsedTime(0); // Resets timer counter

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

    // change in state results in: makes cards inactive, pauses timer
    updateGameStateField(setGameState, "gamePhase", "idle");
  }

  if (gameState.gamePhase === "idle") {
    return (
      <>
        <button onClick={handleStartButton} className="startBtn">
          Start
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
  array,
  setArray,
  chosenCards,
  setChosenCards,
}) {
  const [loading, setLoading] = useState(true);

  // Initial gameBoard setup with fresh fetched urls
  // NOTE: SHould this be lifted to the game container????
  useEffect(() => {
    async function fetchGifs() {
      const tempArray = await populateArrayWithImages(setLoading);
      setArray(tempArray);
      console.log("fetch urls effect called");
    }
    fetchGifs();
  }, []); //Launches on mount only.

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
  useEffect(() => {
    if (gameState.gamePhase === "running") {
      setArray((prevArray) => randomiseArrayOrder(prevArray));
    }
  }, [gameState.gamePhase]);

  function handleGameLost() {
    const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    // setChosenCards([]);
    updateGameStateFields(setGameState, {
      gameOver: false,
      score: 0,
      highScore: updatedHighScore,
      gamePhase: "idle",
    });
    console.log(updatedHighScore);
    alert("Wu-woah. You repeated yourself. Press start to try again");
  }
  function handleGameWon() {
    const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    console.log(updatedHighScore);

    updateGameStateField(setGameState, "highScore", updatedHighScore);
    console.log("game has been won");
    alert("You won!!! ");
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
      randomiseArrayOrder(array);

      if (gameState.score === 1) {
        updateGameStateField(setGameState, "gameWon", true);
      }
    }
  }

  const board = createBoard(gameState, array, handleCardClick);

  return (
    <>
      {loading ? (
        <>
          <div className="loadingElement">
            <div>You please wait!</div>
            <div>
              <h3 className="loading-text">
                Computer is herding random catos{" "}
              </h3>
            </div>
          </div>
        </>
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
        <img className="catImage" id={array[i].id} src={array[i].url}></img>
      </div>
    );
  }
  return board;
}

export { GameBoard, StartButton };
