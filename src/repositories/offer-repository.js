const db = require(`../db/database`);

const setupCollection = async () => {
  const dBase = await db();
  const collection = dBase.collection(`offers`);
  collection.createIndex({date: -1}, {unique: true});
  return collection;
};

let collection;

const getOfferByDate = async (date) => {
  return await collection.findOne({date});
};

const getAllOffers = async () => {
  return await collection.find().toArray();
};

const saveOffer = async (offerData) => {
  return await collection.insertOne(offerData);
};

const removeOffer = async (offerData) => {
  return await collection.deleteOne(offerData);
};

const removeOffers = async (query) => {
  return await collection.deleteMany(query);
};

const initCollection = async () => {
  collection = await setupCollection();
};

module.exports = {
  initCollection,
  getOfferByDate,
  getAllOffers,
  saveOffer,
  removeOffer,
  removeOffers,
};

