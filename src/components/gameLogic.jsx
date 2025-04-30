function isRepeatedCard(chosenCards, cardId) {
  return chosenCards.includes(cardId);
}

function handleCardClick(e) {
  const id = e.target.id;
  console.log(e.target.id);
}

export { isRepeatedCard, handleCardClick };

function handleCardClickOld(e) {
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
