import { useState, useEffect } from "react";

import { getRandomArray, populateArray } from "../utils/helpers";

function GameContainer() {
  const array = populateArray();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  return (
    <>
      <div>
        {" "}
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
  // const array = getRandomArray();

  // const [array, setArray] = useState([]); // Use state for the random array
  const [chosenCards, setChosenCards] = useState([]);

  const array = populateArray();
  getRandomArray(array);

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
        {array[i].id} {array[i].src}
        <img src={array[i].url} width="100" height="150"></img>
      </div>
    );
  }

  return <>{board}</>;
}

export { GameContainer };
