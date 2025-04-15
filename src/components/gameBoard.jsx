import { useState } from "react";

import { getRandomArray } from "../utils/helpers";

function GameBoardRender() {
  const array = getRandomArray();
  const [chosenCards, setChosenCards] = useState([]);
  const [score, setScore] = useState(0);
  console.log("score " + score);

  console.log(chosenCards);

  function handleCardClick(e) {
    console.log(e.target.id);

    setChosenCards([...chosenCards, e.target.id]);
    console.log(chosenCards);
    console.log("needs to check if chosen cards is the same");

    // console.log(chosenCards.find((number) => e.target.id === number));

    if (chosenCards.includes(e.target.id)) {
      setScore(0);
      setChosenCards([]);
      console.log("Repeated");
      // - reset board
      // - reset score
      // - check high score, and replace if higher
    } else {
      console.log("No repeats");
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

export { GameBoardRender };
