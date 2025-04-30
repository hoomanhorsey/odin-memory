import { GameBoard } from "./gameBoard";

function GameUI({ gameState, array, setArray }) {
  console.log("array in GameUI:", array);
  return (
    <>
      {gameState.gamePhase !== "setup" && (
        <>
          <div>StartButton</div>
          <div className="scorePanel">Score </div>
          <div>Timer </div>

          <div className="gameBoard">
            <GameBoard
              gameState={gameState}
              array={array}
              setArray={setArray}
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
