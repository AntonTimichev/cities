export const ICON_SIZE = {
  WIDTH: 30,
  HEIGHT: 30
};

export const citiesMap = `cities__map map`;
export const propertyMap = `property__map map`;

export const optionsOfSorting = {
  '0': `Popular`,
  '1': `Price: low to high`,
  '2': `Price: high to low`,
  '3': `Top rated first`
};

export const sortingParams = {
  '1': {
    property: `price`,
    direction: `asc`
  },
  '2': {
    property: `price`,
    direction: `desc`
  },
  '3': {
    property: `rating`,
    direction: `desc`
  },
};

export const bodyClasses = {
  '/login': `page page--gray page--login`,
  '/offer': `page`,
  '/favorite': `page`,
  '/': `page page--gray page--main`
};

export const directionMap = {
  gt: {
    asc: 1,
    desc: -1
  },
  lt: {
    asc: -1,
    desc: 1
  }
};

export const paths = {
  main: `/`,
  other: `*`,
  login: `/login`,
  offerId: `/offer/:id`,
  private: {
    favorite: `/favorite`
  }
};
