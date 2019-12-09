import {getArrayCards, getRandomElements, getRandomInteger} from "../utils";

const getCardData = () => {
  return {
    id: Math.random().toString(16).slice(2, 8),
    name: getRandomElements(names, 1)[0],
    src: `img/room.jpg`,
    isPremium: !!getRandomInteger(0, 1),
    price: getRandomInteger(60, 120),
    inBookMark: !!getRandomInteger(0, 1),
    roomType: getRandomElements(roomTypes, 1)[0]
  };
};

const roomTypes = [
  `Apartment`,
  `Private room`
];

const names = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Nice, cozy, warm big bed apartment`,
];

export const offers = getArrayCards(getCardData, 5);
