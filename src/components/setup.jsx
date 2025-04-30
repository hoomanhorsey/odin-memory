async function setupGame(
  updateGameStateField,
  setGameState,
  setArray,
  populateArrayWithImages
) {
  updateGameStateField(setGameState, "gamePhase", "setup");
  try {
    const newArray = await populateArrayWithImages(setGameState);
    setArray(newArray);
    updateGameStateField(setGameState, "gamePhase", "idle");
  } catch (err) {
    updateGameStateField(setGameState, "gamePhase", "error");
  }
}

export { setupGame };
