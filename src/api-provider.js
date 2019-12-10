import moment from 'moment';

import OfferModel from "./data-models/offer-model";
import ReviewModel from "./data-models/review-model";

export default class ApiProvider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  async loadOffers() {
    let {data} = await this._api.get(`/hotels`);
    let setCities = new Set();
    data = data.map((offer) => {
      this._store.setDataItem({key: offer.id, item: offer});
      offer = OfferModel.parseToOffer(offer);
      setCities.add(offer.city.name);
      return offer;
    });
    const cityNames = [...setCities];
    return {data, cityNames};
  }

  async syncOffers() {
    if (this._store.needSync) {
      this._store.needSync = false;
      return this._getAllData(); // нет метода синхронизации на сервере
    }
    return this._getAllData();
  }

  refreshOffers(newParams = null) {
    const offers = this._getAllData();
    if (!newParams) {
      return offers;
    }
    offers.forEach((offer) => {
      offer = Object.assign({}, offer, newParams);
      offer = OfferModel.parseToServer(offer);
      this._store.setDataItem({key: offer.id, item: offer});
    });
    return this._getAllData();
  }

  async loadReviews(id) {
    const {data} = await this._api.get(`comments/${id}`);
    return data.length
      ? this._sortReviews(ReviewModel.parseToReviews(data))
      : [];
  }

  async postReview(id, review) {
    const {data} = await this._api.post(`/comments/${id}`, review);
    return data.length
      ? this._sortReviews(ReviewModel.parseToReviews(data))
      : [];
  }

  async postFavorite(path, id, isAdding) {
    if (this._isOnline()) {
      const {data} = await this._api.post(`/favorite/${path}`);
      this._store.setDataItem({key: data.id, item: data});
      return OfferModel.parseToOffer(data);
    } else {
      this._store.needSync = true;
      let offer = OfferModel.parseToOffer(this._store.getDataItem(id));
      offer.isFavorite = isAdding;
      const data = OfferModel.parseToServer(offer);
      this._store.setDataItem({key: data.id, item: data});
      return offer;
    }
  }

  async loadFavorites() {
    const {data} = await this._api.get(`/favorite`);
    data.forEach((offer) => {
      this._store.setDataItem({key: offer.id, item: offer});
    });
    return OfferModel.parseToOffers(data);
  }

  async loginUser(url, user) {
    return await this._api.post(url, user);
  }

  async checkAuth(url) {
    return await this._api.get(url);
  }

  _sortReviews(reviews) {
    const sortedReviews = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sortedReviews.map((review) => Object.assign({}, review, {
      date: `${moment(review.date).format(`MMMM YYYY`)}`
    }));
  }

  _isOnline() {
    return window.navigator.onLine;
  }

  _getAllData() {
    return OfferModel.parseToOffers(Object.values(this._store.getAllData()));
  }
}
