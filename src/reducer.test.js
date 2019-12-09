import {ActionType, reducer} from "./reducer";

const mock = {
  'Amsterdam': [
    {
      id: `12ea45`,
      name: `Beautiful & luxurious apartment at great location`,
      src: `img/room.jpg`,
      isPremium: false,
      price: 86,
      inBookMark: false,
      roomType: `Apartment`
    },
    {
      id: `109ff3`,
      name: `Wood and stone place`,
      src: `img/room.jpg`,
      isPremium: true,
      price: 93,
      inBookMark: false,
      roomType: `Apartment`
    },
    {
      id: `34ba53`,
      name: `Nice, cozy, warm big bed apartment`,
      src: `img/room.jpg`,
      isPremium: false,
      price: 115,
      inBookMark: true,
      roomType: `Private room`
    },
  ],
  'Hamburg': [
    {
      id: `109f4t`,
      name: `Wood and stone place`,
      src: `img/room.jpg`,
      isPremium: true,
      price: 56,
      inBookMark: true,
      roomType: `Apartment`
    },
    {
      id: `363g34`,
      name: `Nice, cozy, warm big bed apartment`,
      src: `img/room.jpg`,
      isPremium: false,
      price: 34,
      inBookMark: false,
      roomType: `Private room`
    },
  ],
};

it(`Should change the current city field to the transmitted value`, () => {
  expect(reducer({
    currentCity: `Amsterdam`,
    offers: mock[`Amsterdam`],
    cities: Object.keys(mock)
  }, {
    type: ActionType.CHANGE_CITY,
    payload: `Hamburg`,
  })).toEqual({
    currentCity: `Hamburg`,
    offers: mock[`Amsterdam`],
    cities: Object.keys(mock)
  });
});

it(`Should change the offers field to the passed value`, () => {
  expect(reducer({
    currentCity: `Amsterdam`,
    offers: mock[`Amsterdam`],
    cities: Object.keys(mock)
  }, {
    type: ActionType.GET_OFFERS,
    payload: mock[`Hamburg`],
  })).toEqual({
    currentCity: `Amsterdam`,
    offers: mock[`Hamburg`],
    cities: Object.keys(mock)
  });
});


