import {getArrayCards, getRandomElements, getRandomInteger} from "../utils";

const getCardData = (coords) => {
  return {
    id: Math.random().toString(16).slice(2, 8),
    name: getRandomElements(names, 1)[0],
    src: `img/room.jpg`,
    isPremium: !!getRandomInteger(0, 1),
    price: getRandomInteger(60, 120),
    inBookMark: !!getRandomInteger(0, 1),
    roomType: getRandomElements(roomTypes, 1)[0],
    coords
  };
};

const coords = [
  [52.395570, 4.875431],
  [52.417196, 4.902786],
  [52.393014, 4.903487],
  [52.374183, 4.892763],
  [52.392677, 4.847682],
  [52.357554, 4.912858],
  [52.352164, 4.862169],
  [52.394647, 4.880173],
  [52.385484, 4.938223],
  [52.401392, 4.928084],
  [52.374118, 4.878774],
  [52.360040, 4.949277],
  [52.364264, 4.914434]
];

const roomTypes = [
  `Apartment`,
  `Private room`
];

const names = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Nice, cozy, warm big bed apartment`,
];

export const offers = {
  'Amsterdam': getArrayCards(getCardData, 8, getRandomElements(coords, 8)),
  'Cologne': getArrayCards(getCardData, 7, getRandomElements(coords, 7)),
  'Brussels': getArrayCards(getCardData, 6, getRandomElements(coords, 6)),
  'Paris': getArrayCards(getCardData, 5, getRandomElements(coords, 5)),
  'Hamburg': getArrayCards(getCardData, 4, getRandomElements(coords, 4)),
  'Dusseldorf': getArrayCards(getCardData, 3, getRandomElements(coords, 3)),
};
