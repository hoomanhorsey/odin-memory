import { useState, useEffect } from "react";

function Score({ score, highScore }) {
  return (
    <>
      <div>Score : {score} </div>
      <div>High Score : {highScore} </div>
    </>
  );
}

//https://react.dev/learn/separating-events-from-effects#fix-a-variable-that-doesnt-update

function Timer({ gameState, elapsedTime, setElapsedTime }) {
  useEffect(() => {
    console.log(gameState.gameStatus);
    if (gameState.gameStatus === "running") {
      const id = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 60);

      return () => {
        clearInterval(id);
      };
    } else {
      // setElapsedTime(0);
    }
  }, [gameState.gameStatus]);

  return (
    <>
      <div>Time elapsed: {elapsedTime} </div>

      <div>Fastest time:</div>
    </>
  );
}
export { Score, Timer };
