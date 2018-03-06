const offerRepository = require(`../../repositories/OfferRepository`);
// const imageRepository = require(`./src/repositories/ImageRepository`);

const NotFoundError = require(`../errors/NotFoundError`);

const getOffers = async (req) => {
  return await toPage(await offerRepository.getAllOffers(), req.query.skip, req.query.limit);
};

const getOfferByDate = async (req) => {
  const date = req.params.date;
  const result = await offerRepository.getOfferByDate(date);
  if (!result) {
    throw new NotFoundError(`There is no offer for ${date} date`);
  }
  return result;
};

const addOffer = async (req) => {
  // const avatar = req.file;
  // if (avatar) {
  //   await offerRepository.saveAvatar(req.file.buffer);
  // }
  await offerRepository.saveOffer(req.body);
  return req.body;
};

const toPage = async (offers, skip = 0, limit = 20) => {
  console.log(offers);
  console.log(typeof offers);
  return {
    data: await (offers.slice(skip).slice(0, limit)),
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
