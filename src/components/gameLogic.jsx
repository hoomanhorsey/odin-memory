function isRepeatedCard(chosenCards, cardId) {
  return chosenCards.includes(cardId);
}

// function handleCardClick(e) {
//   const id = e.target.id;
//   console.log(e.target.id);
// }

export { isRepeatedCard };
