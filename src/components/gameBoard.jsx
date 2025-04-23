import { useState, useEffect } from "react";

import { getRandomArray, populateArray } from "../utils/helpers";
import React from "react";

function ReactLoadingText() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <p>Loading {dots}</p>;
}

function GameHeader() {
  return (
    <>
      <h1>Cato Memory Game-o</h1>
    </>
  );
}

function GameContainer() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  return (
    <>
      <div>
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
      <div>Score: {score} </div>
      <div>High Score: {highScore} </div>
    </>
  );
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
      const array = await populateArray(setLoading);
      setArray(array);
    }
    fetchGifs();
  }, [gameOver]);

  // const array = populateArray();
  getRandomArray(array);
  // console.table(array);

  // // Asyncversion Fetch the random array when the component mounts
  // useEffect((array) => {
  //   const fetchArray = async () => {
  //     const result = await getRandomArray(array); // Get the random array
  //     setArray(result); // Update the state with the new array
  //   };

  //   fetchArray(); // Call the function to fetch the array
  // }, []); // Empty dependency array means this effect runs only once when the component mounts

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

  const board = [];
  for (let i = 0; i < array.length - 1; i++) {
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
  console.log(loading);

  return (
    <>
      {loading ? (
        <>
          <p className="loading-text">Loading images....</p>
          <p>
            {" "}
            <ReactLoadingText />
          </p>
        </>
      ) : (
        <>{board}</>
      )}
    </>
  );

  // return <>{board}</>;
}

export { GameContainer, GameHeader };
