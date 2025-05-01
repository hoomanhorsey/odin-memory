// import { handleCardClick } from "./gameLogic";
import { updateGameStateField } from "../utils/helpers";
import { isRepeatedCard } from "./gameLogic";
import { randomiseArrayOrder } from "../utils/helpers";
import { useEffect } from "react";

function GameBoard({
  gameState,
  setGameState,
  array,
  setArray,
  chosenCards,
  setChosenCards,
}) {
  const tempBoard = createBoard(gameState, array, handleCardClick);

  // Listens for game over due to losing
  useEffect(() => {
    if (gameState.gamePhase === "gameLost") {
      handleGameLost();
    } else if (gameState.gamePhase === "gameWon") {
      handleGameWon();
    }
  }, [gameState.gamePhase]);

  // Randomises cards
  // useEffect(() => {
  //   if (gameState.gamePhase === "running") {
  //     setArray((prevArray) => randomiseArrayOrder(prevArray));
  //   }
  // }, [gameState.gamePhase]);

  function handleGameLost() {
    alert("handleGameLost function called" + chosenCards);

    // gamePhase has been turned into idle....

    // show tryagain, Tray again with new cards?

    // const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    // // setChosenCards([]);
    // updateGameStateFields(setGameState, {
    //   gameOver: false,
    //   score: 0,
    //   highScore: updatedHighScore,
    //   gamePhase: "idle",
    // });
    // if (gameState.gamePhase === "running") {
    //   console.log(updatedHighScore);
    //   alert("Wu-woah. You repeated yourself. Press start to try again");
    // }
  }
  function handleGameWon() {
    // console.log("game has been won");
    // alert("You won!!! ");
    // setTimer((prev) => ({
    //   ...prev,
    //   elapsedTime: 0,
    // }));
    // const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    // console.log(updatedHighScore);
    // updateGameStateFields(setGameState, {
    //   highScore: updatedHighScore,
    //   // gamePhase: "idle",
    // });
    // console.log(
    //   "fastesttime: " + timer.fastestTime + " elapsedTime " + timer.elapsedTime
    // );
    // const updatedFastestTime =
    //   timer.fastestTime === "No successful attempts"
    //     ? timer.elapsedTime
    //     : Math.min(timer.elapsedTime, timer.fastestTime);
    // console.log(Math.min(timer.elapsedTime, timer.fastestTime));
    // setTimer((prev) => ({ ...prev, fastestTime: updatedFastestTime }));
  }

  function handleCardClick(e) {
    const id = e.target.id;

    if (isRepeatedCard(chosenCards, id)) {
      console.log("Repeated");
      updateGameStateField(setGameState, "gamePhase", "gameLost");
    } else {
      setChosenCards([...chosenCards, e.target.id]);
      updateGameStateField(setGameState, "score", (prevScore) => prevScore + 1);
      console.log("No repeats: " + gameState.score);
      setArray(randomiseArrayOrder(array));

      if (gameState.score === 2) {
        updateGameStateField(setGameState, "gamePhase", "gameWon");
      }
    }
  }
  return (
    <>
      <div className="gameBoard"> {tempBoard}</div>
    </>
  );
}

function createBoard(gameState, array, handleCardClick) {
  const tempBoard = [];

  for (let i = 0; i < array.length; i++) {
    tempBoard.push(
      <div
        className="gameCard"
        key={array[i].id}
        id={array[i].id}
        onClick={gameState.gamePhase === "running" ? handleCardClick : null}
      >
        {" "}
        {/* This causes the array[id] to be displayed */}
        {array[i].id}
        <img
          className={`catImage ${
            gameState.gamePhase === "running" ? "hoverEnabled" : ""
          }`}
          id={array[i].id}
          src={array[i].url}
        ></img>
      </div>
    );
  }
  return tempBoard;
}

function GameBoardOld(
  {
    // gameState,
    // setGameState,
    // array,
    // setArray,
    // chosenCards,
    // setChosenCards,
    // timer,
    // setTimer,
  }
) {
  //!!!!!!!! Previous set up function!!!!//////

  // useEffect(() => {
  //   async function fetchGifs() {
  //     const tempArray = await populateArrayWithImages(setGameState);
  //     setArray(tempArray);
  //     console.log("fetch urls effect called");
  //   }
  //   fetchGifs();
  // }, []); //Launches on mount only.

  // Listens for game over due to losing
  useEffect(() => {
    handleGameLost();
  }, [gameState.gameOver]);

  // Listens for game win.
  useEffect(() => {
    if (gameState.gameWon) {
      console.log(
        "game has won this is from effect - gamewon value: " + gameState.gameWon
      );
      handleGameWon();
    } else {
      console.log(
        "gameWon effect has been called but not logic operates as gameWon is " +
          gameState.gameWon
      );
    }
  }, [gameState.gameWon]);

  // Randomises cards
  // useEffect(() => {
  //   if (gameState.gamePhase === "running") {
  //     setArray((prevArray) => randomiseArrayOrder(prevArray));
  //   }
  // }, [gameState.gamePhase]);

  function handleGameLost() {
    const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    // setChosenCards([]);
    updateGameStateFields(setGameState, {
      gameOver: false,
      score: 0,
      highScore: updatedHighScore,
      // gamePhase: "idle",
    });

    if (gameState.gamePhase === "running") {
      console.log(updatedHighScore);
      alert("Wu-woah. You repeated yourself. Press start to try again");
    }
  }
  function handleGameWon() {
    console.log("game has been won");
    alert("You won!!! ");

    setTimer((prev) => ({
      ...prev,
      elapsedTime: 0,
    }));
    const updatedHighScore = Math.max(gameState.highScore, gameState.score);
    console.log(updatedHighScore);
    updateGameStateFields(setGameState, {
      highScore: updatedHighScore,
      // gamePhase: "idle",
    });

    console.log(
      "fastesttime: " + timer.fastestTime + " elapsedTime " + timer.elapsedTime
    );

    const updatedFastestTime =
      timer.fastestTime === "No successful attempts"
        ? timer.elapsedTime
        : Math.min(timer.elapsedTime, timer.fastestTime);
    console.log(Math.min(timer.elapsedTime, timer.fastestTime));
    setTimer((prev) => ({ ...prev, fastestTime: updatedFastestTime }));
  }

  function handleCardClick(e) {
    const id = e.target.id;

    if (isRepeatedCard(chosenCards, id)) {
      console.log("Repeated");
      updateGameStateField(setGameState, "gamePhase", "idle");
      alert("gamelost");
    } else {
      setChosenCards([...chosenCards, e.target.id]);
      updateGameStateField(setGameState, "score", (prevScore) => prevScore + 1);
      console.log("No repeats: " + gameState.score);
      setArray(randomiseArrayOrder(array));

      if (gameState.score === 2) {
        updateGameStateField(setGameState, "gameWon", true);
      }
    }
  }

  const board = createBoard(gameState, array, handleCardClick);
  console.log(gameState.gamePhase);
  return (
    <>
      {gameState.gamePhase === "setup" ? (
        <div className="loadingElement">
          <div>You please wait!</div>
          <div>
            <h3 className="loading-text">Computer is herding random catos </h3>
          </div>
        </div>
      ) : (
        <>{board}</>
      )}
    </>
  );

  // return <>{board}</>;
}

export { GameBoard };
