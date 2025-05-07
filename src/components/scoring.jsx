import { useEffect } from "react";

function Score({ gameState }) {
  return (
    <>
      <div>Score : {gameState.score} </div>
      <div>High Score : {gameState.highScore} </div>
    </>
  );
}

//https://react.dev/learn/separating-events-from-effects#fix-a-variable-that-doesnt-update

function formatTime(rawTime) {
  const hours = Math.floor(rawTime / 3600);
  const minutes = Math.floor((rawTime % 3600) / 60);
  const seconds = Math.floor(rawTime % 60);

  const formattedHours = hours.toString().padStart(2, 0);
  const formattedMinutes = minutes.toString().padStart(2, 0);
  const formattedSeconds = seconds.toString().padStart(2, 0);

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function Timer({ gameState, timer, setTimer }) {
  useEffect(() => {
    if (gameState.gamePhase === "running") {
      const id = setInterval(() => {
        setTimer((prev) => ({ ...prev, elapsedTime: prev.elapsedTime + 1 }));
      }, 1000);

      return () => {
        clearInterval(id);
      };
    } else if (gameState.gamePhase === "idle") {
      setTimer((prev) => ({ ...prev, elapsedTime: 0 }));
    }
  }, [gameState.gamePhase]);

  return (
    <>
      <div>Elapsed time: {formatTime(timer.elapsedTime)} </div>
      {timer.fastestTime !== null ? (
        <div>Fastest time: {formatTime(timer.fastestTime)}</div>
      ) : null}
    </>
  );
}

export { Score, Timer };
