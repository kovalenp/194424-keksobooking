const db = require(`../db/mongo`);

const setupCollection = async () => {
  const dBase = await db;

  return dBase.collection(`offers`);
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
}

module.exports = new OfferRepository(setupCollection()
    .catch((e) => {
      console.error(`Failed to set up offers collection: ${e}`);
    }));
