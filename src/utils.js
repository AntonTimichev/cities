export const getRandomElements = (array, amount = 1) => {
  if (amount > array.length) {
    return array;
  }
  let copyArr = array.slice();
  return Array.from({length: amount}, () => copyArr.splice(getRandomInteger(0, copyArr.length - 1), 1)[0]);
};

export const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getArrayCards = (fn, amount) => {
  return Array.from({length: amount}, () => fn());
};
