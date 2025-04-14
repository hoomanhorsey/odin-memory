import { getRandomArray } from "./randomArray";

const array = getRandomArray();

console.log(array);

function GameBoardRender({ array }) {
  const board = [];
  for (let i = 0; i < array.length; i++) {
    board.push(<div className="gameCard"> {array[i]} </div>);
  }
  console.log(board[0]);
  return <>{board}</>;
}

export { GameBoardRender };
