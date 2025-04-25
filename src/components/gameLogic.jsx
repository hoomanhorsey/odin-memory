function isRepeatedCard(chosenCards, cardId) {
  return chosenCards.includes(cardId);
}

function updateHighScore(score, highScore, setHighScore) {
  if (score > highScore) setHighScore(score);
}

export { isRepeatedCard, updateHighScore };
