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

function declareArray() {
  const array = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
  ];
  return array;
}

// Remember to make this async, when you turn the try back on

async function populateArray() {
  const array = declareArray();
  for (let i = 0; i < array.length; i++) {
    try {
      array[i].url = await getImageUrl();
    } catch (error) {
      array[i].url =
        "https://upload.wikimedia.org/wikipedia/commons/6/61/Cute_cat_extends_its_antennae.jpg"; // fallback placeholder
    }
  }
  // console.table(array);

  return array;
}

// Remember to make this async, when you turn the try back on
function populateArraytest() {
  const array = declareArray();
  for (let i = 0; i < array.length; i++) {
    array[i].url =
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Cute_cat_extends_its_antennae.jpg"; // fallback placeholder

    // try {
    //   array[i].url = await getImageUrl();
    // } catch (error) {
    //   array[i].url =
    //     "https://upload.wikimedia.org/wikipedia/commons/6/61/Cute_cat_extends_its_antennae.jpg"; // fallback placeholder
    // }
  }
  console.table(array);
  return array;
}

function getRandomArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let ranIndex = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[ranIndex];
    array[ranIndex] = temp;
  }
  return array;
}

async function getImageUrl() {
  const response = await fetch("https://api.thecatapi.com/v1/images/search", {
    mode: "cors",
  });

  const imageData = await response.json();

  console.log(imageData);
  console.log(imageData[0].url);
  return imageData[0].url;
}

// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_yACuZwjsBr1D2jU3m9r0w3yWqqTD7fSp4v3Zg4t2y7chrBv5rnAAi35V3sOeUPp9

//  return imageData.data.images.original.url;

// "https://api.giphy.com/v1/gifs/translate?api_key=IjTmlnWb2C2AVGtWnglFoUWx4P679A6P&s=cats",

export { getRandomArray, populateArray };
//
//
//
//
//
//

async function getRandomArrayOld() {
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

  // for (let i = 0; i < array.length; i++) {
  //   try {
  //     array[i].url = await getImageUrl();
  //   } catch (error) {
  //     array[i].url =
  //       "https://upload.wikimedia.org/wikipedia/commons/6/61/Cute_cat_extends_its_antennae.jpg"; // fallback placeholder
  //   }
  // }

  console.table(array);
  return array;
}
