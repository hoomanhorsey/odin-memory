import { updateGameStateFields } from "../utils/helpers";
import { randomiseArrayOrder, populateArrayWithImages } from "../utils/helpers";

function GameButton({
  gameState,
  setGameState,
  setChosenCards,
  array,
  setArray,
}) {
  async function handleGameButton(option) {
    console.log("called handle Game: " + option);

    if (option === "start") {
      setArray(randomiseArrayOrder(array));
      setChosenCards([]);

      // change in gamePhase to 'running':
      // - Randomizing the game cards (via useEffect in main board)
      // - Enabling card clicks (by conditional 'onClick' in createBoard)
      // - Starting the timer (via Timer component's useEffect)
      updateGameStateFields(setGameState, {
        score: 0,
        gameWon: false,
        gamePhase: "running",
      });
    } else if (option === "restart") {
      // change in gamePhase to idle: cards inactive, pauses timer
      updateGameStateFields(setGameState, {
        score: 0,
        gamePhase: "idle",
      });
    } else if (option === "restartNewCats") {
      updateGameStateFields(setGameState, {
        score: 0,
        gamePhase: "setup",
      });
      const newArray = await populateArrayWithImages(setGameState);
      setArray(newArray);
      // change in gamePhase to idle: cards inactive, pauses timer
      updateGameStateFields(setGameState, {
        gamePhase: (prevPhase) => (prevPhase === "setup" ? "idle" : prevPhase),
      });
    }
  }

  if (gameState.gamePhase === "idle") {
    return (
      <>
        <button
          onClick={() => handleGameButton("start", setChosenCards)}
          className="gameBtn pulse-element"
        >
          Start Timer
        </button>
      </>
    );
  } else if (gameState.gamePhase === "running") {
    return (
      <>
        <button onClick={() => handleGameButton("restart")} className="gameBtn">
          Restart
        </button>
      </>
    );
  } else if (
    gameState.gamePhase === "gameLost" ||
    gameState.gamePhase === "gameWon"
  ) {
    return (
      <>
        <button onClick={() => handleGameButton("restart")} className="gameBtn">
          Try Again
        </button>
        <button
          onClick={() => handleGameButton("restartNewCats")}
          className="gameBtn"
        >
          Try Again with a different catos
        </button>
      </>
    );
  }
}

export { GameButton };
