export default class LocalStore {
  constructor(storage, {dataKey}) {
    this._storage = storage;
    this._dataKey = dataKey;
  }

  set needSync(value) {
    this._storage.setItem(`needSync`, `${value}`);
  }

  get needSync() {
    return JSON.parse(this._storage.getItem(`needSync`));
  }

  setDataItem({key, item}) {
    const offers = this.getAllData();
    offers[key] = item;
    this._storage.setItem(this._dataKey, JSON.stringify(offers));
  }

  getDataItem(id) {
    const offers = this.getAllData();
    return offers[id];
  }

  getAllData() {
    return this._getAll(this._dataKey);
  }

  _getAll(key) {
    const emptyItems = {};
    const offers = this._storage.getItem(key);

    if (!offers) {
      return emptyItems;
    }

    try {
      return JSON.parse(offers);
    } catch (e) {
      return emptyItems;
    }
  }
}
