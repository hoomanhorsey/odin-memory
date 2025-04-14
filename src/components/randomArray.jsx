function getRandomArray() {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  for (let i = array.length - 1; i > 0; i--) {
    let ranIndex = Math.floor(Math.random() * (i + 1));

    let temp = array[i];
    array[i] = array[ranIndex];
    array[ranIndex] = temp;
  }
  console.table(array);

  return array;
}
export { getRandomArray };
