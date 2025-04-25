import { useState, useEffect } from "react";
import { isRepeatedCard, updateHighScore } from "./gameLogic.jsx";
import {
  randomiseArrayOrder,
  populateArrayWithImages,
} from "../utils/helpers.jsx";

function GameBoard({
  score,
  setScore,
  highScore,
  setHighScore,
  gameOver,
  setGameOver,
  gameWon,
  setGameWon,
  gameReset,
  setGameReset,
}) {
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
  }, [gameReset]);

  useEffect(() => {
    handleGameOver();
  }, [gameOver]);

  useEffect(() => {
    if (gameWon) {
      console.log("game has won this is from effect");
      console.log("gamewon value: " + gameWon);
      handleGameWon();
    } else {
      console.log(
        "gameWon effect has been called but not logic operates as gameWon is " +
          gameWon
      );
    }
  }, [gameWon]);

  randomiseArrayOrder(array);

  // console.log(
  //   "chosenCards: " +
  //     chosenCards +
  //     ", Score: " +
  //     score +
  //     ", HighScore: " +
  //     highScore
  // );

  function handleGameOver() {
    updateHighScore(score, highScore, setHighScore);
    // if (score > highScore) setHighScore(score);
    setScore(0);
    setChosenCards([]);
    setGameOver(false);
  }
  function handleGameWon() {
    updateHighScore(score, highScore, setHighScore);

    // if (score > highScore) setHighScore(score);
    console.log("game has been won");
    alert("You won!!! ");
  }

  function handleCardClick(e) {
    const id = e.target.id;
    // console.log("chosen card: " + e.target.id);
    // console.log("Score: " + score);

    if (isRepeatedCard(chosenCards, id)) {
      console.log("Repeated");
      // handleGameOver();
      setGameOver(true);
    } else {
      setChosenCards([...chosenCards, e.target.id]);
      setScore((prev) => prev + 1);
      console.log("No repeats: " + score);
      if (score === 1) {
        setGameWon(true);
        // handleGameWon();
      }
    }
  }

  const board = createBoard(array, handleCardClick);

  return (
    <>
      {loading ? (
        <>
          <div className="loadingElement">
            <div className="loadingElement">
              <div>You please wait!</div>
              <div>
                <h3 className="loading-text">
                  Computer is herding random catos{" "}
                </h3>
              </div>
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

export { GameBoard };
