

export default class ReviewModel {
  constructor(data) {
    this.id = data[`id`];
    this.user = {
      id: data[`user`][`id`],
      isPro: data[`user`][`is_pro`],
      name: data[`user`][`name`],
      avatarUrl: data[`user`][`avatar_url`],
    };
    this.rating = data[`rating`];
    this.comment = data[`comment`];
    this.date = data[`date`];
  }

  static parseToReview(data) {
    return new ReviewModel(data);
  }

  static parseToReviews(data) {
    return data.map(ReviewModel.parseToReview);
  }

  static parseToServer(data) {
    return {
      'id': data.id,
      'user': {
        'id': data.user.id,
        'is_pro': data.user.isPro,
        'name': data.user.name,
        'avatar_url': data.user.avatarUrl
      },
      'rating': data.rating,
      'comment': data.comment,
      'date': data.date
    };
  }
}

