// function getRandomArray() {
//   const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

//   for (let i = array.length - 1; i > 0; i--) {
//     let ranIndex = Math.floor(Math.random() * (i + 1));

//     let temp = array[i];
//     array[i] = array[ranIndex];
//     array[ranIndex] = temp;
//   }
//   console.table(array);

//   return array;
// }

function getRandomArray() {
  const array = [
    { id: 0, src: "url - calico" },
    { id: 1, src: "url - tuxedo" },
    { id: 2, src: "url - ginger tabby" },
    { id: 3, src: "url - grey siberian with longhair" },
    { id: 4, src: "url - siamese with brown points" },
    { id: 5, src: "url - tortoiseshell" },
    { id: 6, src: "url - brown tabby" },
    { id: 7, src: "url - ragdoll" },
    { id: 8, src: "url - british shorthair" },
    { id: 9, src: "url - black shorthair" },
    { id: 10, src: "url - grey tabby " },
    { id: 11, src: "url - white long hair" },
    { id: 12, src: "url - black and white" },
  ];
  for (let i = array.length - 1; i > 0; i--) {
    let ranIndex = Math.floor(Math.random() * (i + 1));

    let temp = array[i];
    array[i] = array[ranIndex];
    array[ranIndex] = temp;
  }

  return array;
}

export { getRandomArray };
