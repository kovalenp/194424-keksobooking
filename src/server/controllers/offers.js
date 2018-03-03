const storage = require(`../../storage`);
const NotFoundError = require(`../errors/NotFoundError`);

const getOffers = async (req) => {
  return await toPage(await storage.getAllOffers(), req.query.skip, req.query.limit);
};

const getOfferByDate = async (req) => {
  const date = req.params.date;
  const result = await storage.getOfferByDate(date);
  if (!result) {
    throw new NotFoundError(`There is no offer for ${date} date`);
  }
  return result;
};

const toPage = async (offers, skip = 0, limit = 20) => {
  return {
    data: await (offers.slice(skip, limit)), // not handling slicing correctly, bug on purpose
    skip,
    limit,
    total: await offers.length
  };
};

module.exports = {
  getOffers,
  getOfferByDate,
};
