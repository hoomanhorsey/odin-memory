import { useState, useEffect } from "react";

import { getRandomArray } from "../utils/helpers";

function GameContainer() {
  const array = getRandomArray();
  const [chosenCards, setChosenCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  return (
    <>
      <div>A new one</div>
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
  const array = getRandomArray();
  const [chosenCards, setChosenCards] = useState([]);

  console.log(chosenCards);
  console.log("score: " + score);
  console.log("highscore: " + highScore);

  // useEffect(() => {
  //   setGameOver(false);
  //   console.log("called game over", gameOver);
  //   if (score > highScore) setHighScore(score);
  //   setScore(0);
  //   setChosenCards([]);
  //   console.log("sets high score");
  // }, [gameOver]);

  // useEffect(() => console.log("placeeholder"));

  function handleGameOver() {
    if (score > highScore) setHighScore(score);
    setScore(0);
    setChosenCards([]);
    setGameOver(false);
  }

  function handleCardClick(e) {
    console.log(e.target.id);

    setChosenCards([...chosenCards, e.target.id]);
    console.log(chosenCards);
    console.log("needs to check if chosen cards is the same");

    // console.log(chosenCards.find((number) => e.target.id === number));

    if (chosenCards.includes(e.target.id)) {
      // setScore(0);
      // setChosenCards([]);
      console.log("Repeated");
      // setGameOver(true);
      handleGameOver();

      // - reset board
      // - reset score
      // - check high score, and replace if higher
      // trigger gameOver
    } else {
      console.log("No repeats");
      setScore((prev) => prev + 1);

      // score++
      // carry on. reset board
    }
  }
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
        {array[i].id} {array[i].src}
      </div>
    );
  }

  return <>{board}</>;
}

function GameBoardRender() {
  const array = getRandomArray();
  const [chosenCards, setChosenCards] = useState([]);
  const [score, setScore] = useState(0);
  // console.log("score " + score);

  // console.log(chosenCards);

  function handleCardClick(e) {
    console.log(e.target.id);

    setChosenCards([...chosenCards, e.target.id]);
    // console.log(chosenCards);
    // console.log("needs to check if chosen cards is the same");

    // console.log(chosenCards.find((number) => e.target.id === number));

    if (chosenCards.includes(e.target.id)) {
      setScore(0);
      setChosenCards([]);
      // console.log("Repeated");
      // - reset board
      // - reset score
      // - check high score, and replace if higher
    } else {
      // console.log("No repeats");
      setScore(score + 1);

      // score++
      // carry on. reset board
    }
  }
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
        {array[i].id} {array[i].src}
      </div>
    );
  }

  return <>{board}</>;
}

export { GameBoardRender, GameContainer };
