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

function Timer({ elapsedTime, setElapsedTime }) {
  useEffect(() => {
    const id = setInterval(() => {
      setElapsedTime((c) => c + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [elapsedTime]);

  return (
    <>
      <div>Time elapsed: {elapsedTime} </div>

      <div>Fastest time:</div>
    </>
  );
}
export { Score, Timer };
