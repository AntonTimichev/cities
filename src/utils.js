import {bodyClasses, directionMap} from "./apperance";

const doSort = (A, B, property, direction = `asc`) => {
  const a = A[property];
  const b = B[property];
  if (a < b) {
    return directionMap.lt[direction.toLowerCase()];
  }
  if (a > b) {
    return directionMap.gt[direction.toLowerCase()];
  }
  return 0;
};

export const createSorter = ({property, direction}) => {
  return (A, B) => doSort(A, B, property, direction);
};

export const getRandomInteger = (min, max) => {
  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

export const setClassForBody = ({pathname}) => {
  const index = pathname.indexOf(`/`, 1);
  const keyClass = pathname.slice(0, index === -1 ? pathname.length : index);
  document.body.setAttribute(`class`, bodyClasses[keyClass]);
};

