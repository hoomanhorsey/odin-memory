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
  ];
  return array;
}

async function populateArrayWithImages(setLoading) {
  setLoading(true);
  const array = declareArray();
  for (let i = 0; i < array.length; i++) {
    try {
      array[i].url = await getImageUrl();
    } catch (error) {
      array[i].url =
        "https://upload.wikimedia.org/wikipedia/commons/6/61/Cute_cat_extends_its_antennae.jpg"; // fallback placeholder
    }
  }
  setLoading(false);
  return array;
}

function randomiseArrayOrder(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    let ranIndex = Math.floor(Math.random() * (i + 1));
    let temp = newArray[i];
    newArray[i] = newArray[ranIndex];
    newArray[ranIndex] = temp;
  }
  return newArray;
}

async function getImageUrl() {
  const response = await fetch("https://api.thecatapi.com/v1/images/search", {
    mode: "cors",
  });
  const imageData = await response.json();
  return imageData[0].url;
}

function updateGameStateField(setGameState, field, value) {
  setGameState((prev) => ({
    ...prev,
    // [field]: value,
    [field]: typeof value === "function" ? value(prev[field]) : value,
  }));
}

function OldupdateGameStateFields(setGameState, newFields) {
  setGameState((prev) => ({
    ...prev,
    ...newFields,
  }));
}

function updateGameStateFields(setGameState, newFields) {
  setGameState((prev) => {
    const updatedFields = {};

    for (const key in newFields) {
      const valueOrUpdater = newFields[key];
      updatedFields[key] =
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(prev[key])
          : valueOrUpdater;
    }

    return {
      ...prev,
      ...newFields,
    };
  });
}

export {
  randomiseArrayOrder,
  populateArrayWithImages,
  updateGameStateField,
  updateGameStateFields,
};
