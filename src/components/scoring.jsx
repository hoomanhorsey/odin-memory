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

function Timer({ gameState, setTimer, timer }) {
  useEffect(() => {
    console.log("gamestatus , from Timer: " + gameState.gamePhase);
    if (gameState.gamePhase === "running") {
      const id = setInterval(() => {
        setTimer((prev) => ({ ...prev, elapsedTime: prev.elapsedTime + 1 }));
      }, 60);

      return () => {
        clearInterval(id);
      };
    } else {
      setTimer((prev) => ({ ...prev, elapsedTime: 0 }));
    }
  }, [gameState.gamePhase]);

  return (
    <>
      <div>Time elapsed: {timer.elapsedTime} </div>

      <div>Fastest time: {timer.fastestTime}</div>
    </>
  );
}

export { Score, Timer };
