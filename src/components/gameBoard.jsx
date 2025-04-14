import { getRandomArray } from "./randomArray";

const array = getRandomArray();

console.log(array);
function handleCardClick(e) {
  console.log(e.target.id);
}

function GameBoardRender({ array }) {
  const board = [];
  for (let i = 0; i < array.length; i++) {
    board.push(
      <div className="gameCard" id={array[i]} onClick={handleCardClick}>
        {" "}
        Picture of cat and: {array[i]}{" "}
      </div>
    );
  }
  console.log(board[0]);
  return <>{board}</>;
}

export { GameBoardRender };
