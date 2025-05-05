function GameEndMessage({ gameState }) {
  return gameState.gamePhase === "gameWon" ? (
    <div className="gameEndMessage">
      YOU WON!!! Oh Wow! I didn't expect that. At all! Congratulations
    </div>
  ) : gameState.gamePhase === "gameLost" ? (
    <div className="gameEndMessage">
      Oh Boo. You have a bad Memory! You need to concentrate! WAKE UP!
    </div>
  ) : null;
}

export { GameEndMessage };
