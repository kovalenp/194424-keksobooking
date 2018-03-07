const db = require(`../db/database`);
const log = require(`../logger`);

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
    return (await this.collection).insertOne(offerData);
  }

  async removeOffer(offerData) {
    return (await this.collection).deleteOne(offerData);
  }

  async removeOffers(query) {
    return (await this.collection).deleteMany(query);
  }
}

module.exports = new OfferRepository(setupCollection()
    .catch((e) => {
      log.error(`Failed to set up offers collection: ${e}`);
    }));
