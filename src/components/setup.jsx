async function setupGame(
  updateGameStateFields,
  setGameState,
  setArray,
  populateArrayWithImages
) {
  updateGameStateFields(setGameState, { gamePhase: "setup" });
  try {
    const newArray = await populateArrayWithImages(setGameState);
    setArray(newArray);
    updateGameStateFields(setGameState, { gamePhase: "idle" });
  } catch (err) {
    updateGameStateFields(setGameState, { gamePhase: "error" });
  }
}

export { setupGame };
