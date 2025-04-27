import { useState, useEffect } from "react";
import { isRepeatedCard } from "./gameLogic.jsx";
import {
  randomiseArrayOrder,
  populateArrayWithImages,
  updateGameStateField,
  updateGameStateFields,
} from "../utils/helpers.jsx";

function StartButton({ gameStarted, setGameState }) {
  function handleStartButton() {
    console.log("pressing start");
    updateGameStateField(setGameState, "gameStarted", true);
  }

  function handleResetButton() {
    console.log("pressing reset");
    updateGameStateField(setGameState, "gameStarted", false);
  }

  // console.log(gameStarted);

  if (gameStarted === false) {
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
          Restart
        </button>
      </>
    );
  }
}

function GameBoard({ gameState, setGameState, gameReset, setGameReset }) {
  // Notsure i need state for random array.
  // const [array, setArray] = useState([]); // Use state for the random array

  const [chosenCards, setChosenCards] = useState([]);
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGifs() {
      const array = await populateArrayWithImages(setLoading);
      setArray(array);
      // handleGameOver();
    }
    fetchGifs();
  }, [gameReset]); //Note this is launching just on render, it isn't launching on gameReset

  useEffect(() => {
    handleGameOver();
  }, [gameState.gameOver]);

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

  randomiseArrayOrder(array);

  function handleGameOver() {
    const updatedHighScore = Math.max(gameState.highScore, gameState.score);

    updateGameStateFields(setGameState, {
      gameOver: false,
      score: 0,
      highScore: updatedHighScore,
    });
    console.log(updatedHighScore);

    setChosenCards([]);
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
      updateGameStateField(setGameState, "gameOver", true);
    } else {
      setChosenCards([...chosenCards, e.target.id]);
      updateGameStateField(setGameState, "score", (prevScore) => prevScore + 1);
      console.log("No repeats: " + gameState.score);
      if (gameState.score === 1) {
        updateGameStateField(setGameState, "gameWon", true);
      }
    }
  }

  const board = createBoard(array, handleCardClick);

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

function createBoard(array, handleCardClick) {
  const board = [];

  for (let i = 0; i < array.length; i++) {
    board.push(
      <div
        className="gameCard"
        key={array[i].id}
        id={array[i].id}
        onClick={handleCardClick}
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
