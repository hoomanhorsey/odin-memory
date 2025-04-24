import { useState, useEffect } from "react";

import { randomiseArrayOrder, populateArrayWithImages } from "../utils/helpers";
import React from "react";

function ReactLoadingText() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <h3>Herding catos {dots}</h3>;
}

function GameHeader() {
  return (
    <>
      <h1>Cato Memory Game-o</h1>
      <h3>Try to click on each of the 12 cato without selecting any twice.</h3>
    </>
  );
}

function GameContainer() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  return (
    <>
      <div className="scorePanel">
        <Score score={score} highScore={highScore} />
      </div>
      <div className="gameBoard">
        <GameBoardRenderNested
          score={score}
          setScore={setScore}
          highScore={highScore}
          setHighScore={setHighScore}
          gameOver={gameOver}
          setGameOver={setGameOver}
        />
      </div>
    </>
  );
}

function Score({ score, highScore }) {
  return (
    <>
      <div>Score : {score} </div>
      <div>High Score : {highScore} </div>
    </>
  );
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
        {/* {array[i].id} */}
        <img className="catImage" id={array[i].id} src={array[i].url}></img>
      </div>
    );
  }
  return board;
}
function GameBoardRenderNested({
  score,
  setScore,
  highScore,
  setHighScore,
  gameOver,
  setGameOver,
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
    }
    fetchGifs();
  }, [gameOver]);

  randomiseArrayOrder(array);

  console.log(
    "chosenCards: " +
      chosenCards +
      ", Score: " +
      score +
      ", HighScore: " +
      highScore
  );

  function handleGameOver() {
    if (score > highScore) setHighScore(score);
    setScore(0);
    setChosenCards([]);
    setGameOver(false);
  }

  function handleCardClick(e) {
    console.log("chosen card: " + e.target.id);
    setChosenCards([...chosenCards, e.target.id]);
    if (chosenCards.includes(e.target.id)) {
      console.log("Repeated");
      handleGameOver();
    } else {
      console.log("No repeats");
      setScore((prev) => prev + 1);
    }
  }
  console.table(array);

  const board = createBoard(array, handleCardClick);

  return (
    <>
      {loading ? (
        <>
          <div className="loadingElement">
            {/* <div>
              <ReactLoadingText />
            </div> */}
            <div className="loadingElement">
              <div>Please wait...</div>
              <div>
                <h3 className="loading-text">Herding random catos </h3>
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

export { GameContainer, GameHeader };
