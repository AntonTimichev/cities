const o = 3;

export const leafletMock = {
  icon: jest.fn(),
  map() {
    return {
      setView: jest.fn(),
      remove: jest.fn(),
    };
  },
  marker() {
    return {
      addTo: jest.fn(),
    };
  },
  tileLayer() {
    return {
      addTo: jest.fn(),
    };
  },
  layerGroup() {
    return {
      addLayer: jest.fn(),
      addTo: jest.fn()
    };
  },
  featureGroup() {
    return {
      addTo: jest.fn()
    };
  }
};

export const OffersMock = [
  {
    bedrooms: 1,
    city: {
      location: {
        latitude: 38.77278,
        longitude: 4.44377,
        zoom: 16
      },
      name: `Amsterdam`
    },
    description: `This is good place`,
    goods: [`eat`, `meat`],
    host: {
      avatarUrl: `img/avatar-angelina.jpg`,
      id: 23,
      isPro: false,
      name: `Angelina`,
    },
    id: 1,
    images: [
      `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
      `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
      `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
      `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`
    ],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 42.78687,
      longitude: 4.373773,
      zoom: 16
    },
    maxAdults: 6,
    previewImage: `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
    price: 245,
    rating: 10,
    title: `Amazing and Extremely Central Flat`,
    type: `room`
  },
  {
    bedrooms: 4,
    city: {
      location: {
        latitude: 44.43737,
        longitude: 5.00434,
        zoom: 14
      },
      name: `Hamburg`
    },
    description: `I am happy to welcome you to my apartment in the city center!`,
    goods: [
      `Laptop friendly workspace`,
      `Towels`,
      `Breakfast`,
      `Washer`
    ],
    host: {
      avatarUrl: `img/avatar-angelina.jpg`,
      id: 27,
      isPro: true,
      name: `Angelina`,
    },
    id: 2,
    images: [
      `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
      `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
      `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
      `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`
    ],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 42.47577,
      longitude: 4.1227,
      zoom: 15
    },
    maxAdults: 3,
    previewImage: `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
    price: 115,
    rating: 11,
    title: `The Joshua Tree House`,
    type: `apartment`
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 44.58888,
        longitude: 4.00399,
        zoom: 12
      },
      name: `Paris`
    },
    description: `Three words: location, cosy and chic!`,
    goods: [
      `Washer`,
      `Breakfast`,
      `Air conditioning`
    ],
    host: {
      avatarUrl: `img/avatar-angelina.jpg`,
      id: 13,
      isPro: false,
      name: `Angelina`,
    },
    id: 3,
    images: [
      `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
      `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
      `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`
    ],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 59.3232,
      longitude: 4.99988,
      zoom: 18
    },
    maxAdults: 4,
    previewImage: `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
    price: 199,
    rating: 8,
    title: `Waterfront with extraordinary view`,
    type: `house`
  },
];
