import { useState } from "react";

import { getRandomArray, addSelectedArray } from "../utils/helpers";

const array = getRandomArray();

function GameBoardRender({ array }) {
  const [chosenCards, setChosenCards] = useState([]);
  console.log(chosenCards);

  function handleCardClick(e) {
    console.log(e.target.id);

    addSelectedArray(e.target.id);
    setChosenCards([...chosenCards, e.target.id]);
    console.log(chosenCards);
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
  console.log(board[0]);
  return <>{board}</>;
}

export { GameBoardRender };
