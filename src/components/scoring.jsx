function Score({ score, highScore }) {
  return (
    <>
      <div>Score : {score} </div>
      <div>High Score : {highScore} </div>
    </>
  );
}

function Timer() {
  return (
    <>
      <div>Time elapsed: </div>

      <div>Fastest time:</div>
    </>
  );
}
export { Score, Timer };
