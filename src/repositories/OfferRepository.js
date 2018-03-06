const db = require(`../db/mongo`);
const setupCollection = async () => {
  const dBase = await db;
  const collection = dBase.collection(`offers`);
  collection.createIndex({date: -1}, {unique: true});
  return collection;
};

class OfferRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async getOfferByDate(date) {
    return (await this.collection).findOne({date});
  }

  async getAllOffers() {
    return (await this.collection).find().toArray();
  }

  async saveOffer(offerData) {
    return (await this.collection).insertOne(normalizeOffer(offerData));
  }

  async removeOffer(date) {
    return (await this.collection).remove({date});
  }
}

const normalizeOffer = (data) => {
  return {
    author: {
      name: data.author.name,
      avatar: data.author.avatar,
    },
    offer: {
      title: data.offer.title,
      address: data.offer.address,
      description: data.offer.description,
      price: parseInt(data.offer.price, 10),
      type: data.offer.type,
      rooms: parseInt(data.offer.rooms, 10),
      guests: parseInt(data.offer.guests, 10),
      checkin: data.offer.checkin,
      checkout: data.offer.checkout,
      features: data.offer.features,
    },
    location: {
      x: data.location ? parseInt(data.location.x, 10) : null,
      y: data.location ? parseInt(data.location.y, 10) : null,
    },
    avatar: {
      path: data.avatar ? data.avatar.path : null,
      mimetype: data.avatar ? data.avatar.mimetype : null,
    },
    date: data.date ? String(data.date) : String(Date.now())
  };
};


module.exports = new OfferRepository(setupCollection()
    .catch((e) => {
      console.error(`Failed to set up offers collection: ${e}`);
    }));
