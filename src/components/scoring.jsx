import { useState, useEffect } from "react";

function Score({ gameState }) {
  return (
    <>
      <div>Score : {gameState.score} </div>
      <div>High Score : {gameState.highScore} </div>
    </>
  );
}

//https://react.dev/learn/separating-events-from-effects#fix-a-variable-that-doesnt-update

function Timer({ gameState, timer, setTimer }) {
  // const [timer, setTimer] = useState({
  //   elapsedTime: 500,
  //   fastestTime: null,
  // });

  useEffect(() => {
    console.log("gamestatus , from Timer: " + gameState.gamePhase);
    if (gameState.gamePhase === "running") {
      const id = setInterval(() => {
        setTimer((prev) => ({ ...prev, elapsedTime: prev.elapsedTime + 1 }));
      }, 60);

      return () => {
        clearInterval(id);
      };
    } else if (gameState.gamePhase === "idle") {
      setTimer((prev) => ({ ...prev, elapsedTime: 0 }));
    }
  }, [gameState.gamePhase]);

  // console.log(timer.elapsedTime);
  return (
    <>
      <div>Time elapsed: {timer.elapsedTime} </div>
      {timer.fastestTime !== null ? (
        <div>Fastest time: {timer.fastestTime}</div>
      ) : null}
    </>
  );
}

export { Score, Timer };
