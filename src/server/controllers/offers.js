const repository = require(`../../repository`);
const NotFoundError = require(`../errors/NotFoundError`);

const getOffers = async (req) => {
  return await toPage(await repository.getAllOffers(), req.query.skip, req.query.limit);
};

const getOfferByDate = async (req) => {
  const date = req.params.date;
  const result = await repository.getOfferByDate(date);
  if (!result) {
    throw new NotFoundError(`There is no offer for ${date} date`);
  }
  return result;
};

const addOffer = async (req) => {
  const avatar = req.file;
  if (avatar) {
    await repository.saveAvatar(req.file.buffer);
  }
  await repository.saveOffer(req.body);
  return req.body;
};

const toPage = async (offers, skip = 0, limit = 20) => {
  return {
    data: await (offers.slice(skip).slice(0, limit)), // not handling slicing correctly, bug on purpose
    skip,
    limit,
    total: await offers.length
  };
};

module.exports = {
  getOffers,
  getOfferByDate,
  addOffer,
};
