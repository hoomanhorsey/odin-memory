import { useState } from "react";

import { GameBoard } from "./gameBoard";
import { GameButton } from "./gameButton";

import { Score, Timer } from "./scoring";

function GameUI({ gameState, setGameState, array, setArray }) {
  const [chosenCards, setChosenCards] = useState([]);
  const [timer, setTimer] = useState({
    elapsedTime: 0,
    fastestTime: null,
  });
  return (
    <>
      {gameState.gamePhase !== "setup" && (
        <>
          <div>
            <GameButton
              gameState={gameState}
              setTimer={setTimer}
              setGameState={setGameState}
              setChosenCards={setChosenCards}
              array={array}
              setArray={setArray}
            />
          </div>

          <div className="scorePanel">
            <Score gameState={gameState} />
          </div>

          <div className="timerPanel">
            <Timer gameState={gameState} />
          </div>

          <div className="gameBoard">
            <GameBoard
              gameState={gameState}
              setGameState={setGameState}
              array={array}
              setArray={setArray}
              chosenCards={chosenCards}
              setChosenCards={setChosenCards}
            />
          </div>
        </>
      )}
    </>
  );
}

function GameUIOriginal() {
  return (
    <>
      {gameState.gamePhase !== "setup" && (
        <>
          <div>
            <StartButton
              setArray={setArray}
              gameState={gameState}
              setGameState={setGameState}
              chosenCards={chosenCards}
              setChosenCards={setChosenCards}
              setTimer={setTimer}
              timer={timer}
            />
          </div>
          <div className="scorePanel">
            <Score score={gameState.score} highScore={gameState.highScore} />
          </div>
          <div>
            <Timer gameState={gameState} timer={timer} setTimer={setTimer} />
          </div>

          <div className="gameBoard">
            <GameBoard
              gameState={gameState}
              setGameState={setGameState}
              array={array}
              setArray={setArray}
              chosenCards={chosenCards}
              setChosenCards={setChosenCards}
              timer={timer}
              setTimer={setTimer}
            />
          </div>
        </>
      )}
    </>
  );
}

export { GameUI };

// {
//   return (
//     <>
//       {gameState.gamePhase !== "setup" && (
//         <>
//           <div>
//             <StartButton
//               setArray={setArray}
//               gameState={gameState}
//               setGameState={setGameState}
//               chosenCards={chosenCards}
//               setChosenCards={setChosenCards}
//               setTimer={setTimer}
//               timer={timer}
//             />
//           </div>
//           <div className="scorePanel">
//             <Score score={gameState.score} highScore={gameState.highScore} />
//           </div>
//           <div>
//             <Timer gameState={gameState} timer={timer} setTimer={setTimer} />
//           </div>

//           <div className="gameBoard">
//             <GameBoard
//               gameState={gameState}
//               setGameState={setGameState}
//               array={array}
//               setArray={setArray}
//               chosenCards={chosenCards}
//               setChosenCards={setChosenCards}
//               timer={timer}
//               setTimer={setTimer}
//             />
//           </div>
//         </>
//       )}
//     </>
//   );
// }
