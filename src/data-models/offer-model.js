export default class OfferModel {
  constructor(data) {
    this.bedrooms = data[`bedrooms`];
    this.city = {
      location: {
        latitude: data[`city`][`location`][`latitude`],
        longitude: data[`city`][`location`][`longitude`],
        zoom: data[`city`][`location`][`zoom`]
      },
      name: data[`city`][`name`]
    };
    this.description = data[`description`];
    this.goods = data[`goods`];
    this.host = {
      avatarUrl: data[`host`][`avatar_url`],
      id: data[`host`][`id`],
      isPro: data[`host`][`is_pro`],
      name: data[`host`][`name`],
    };
    this.id = data[`id`];
    this.images = data[`images`];
    this.isFavorite = data[`is_favorite`];
    this.isPremium = data[`is_premium`];
    this.location = {
      latitude: data[`location`][`latitude`],
      longitude: data[`location`][`longitude`],
      zoom: data[`location`][`zoom`]
    };
    this.maxAdults = data[`max_adults`];
    this.previewImage = data[`preview_image`];
    this.price = data[`price`];
    this.rating = data[`rating`];
    this.title = data[`title`];
    this.type = data[`type`];
  }

  static parseToOffer(data) {
    return new OfferModel(data);
  }

  static parseToOffers(data) {
    return data.map(OfferModel.parseToOffer);
  }

  static parseToServer(data) {
    return {
      'bedrooms': data.bedrooms,
      'city': {
        'location': {
          'latitude': data.city.location.latitude,
          'longitude': data.city.location.longitude,
          'zoom': data.city.location.zoom
        },
        'name': data.city.name
      },
      'description': data.description,
      'goods': data.goods,
      'host': {
        'avatar_url': data.host.avatarUrl,
        'id': data.host.id,
        'is_pro': data.host.isPro,
        'name': data.host.name,
      },
      'id': data.id,
      'images': data.images,
      'is_favorite': data.isFavorite,
      'is_premium': data.isPremium,
      'location': {
        'latitude': data.location.latitude,
        'longitude': data.location.longitude,
        'zoom': data.location.zoom
      },
      'max_adults': data.maxAdults,
      'preview_image': data.previewImage,
      'price': data.price,
      'rating': data.rating,
      'title': data.title,
      'type': data.type
    };
  }
}

