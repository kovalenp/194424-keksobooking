const offerRepository = require(`../../repositories/OfferRepository`);
const imageRepository = require(`../../repositories/ImageRepository`);
const buffer2stream = require(`../../utils/buffer2stream`)

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
  const data = req.body;
  const avatar = req.file;
  if (avatar) {
    const avatarInfo = {
      path: `/api/offers/${data.date}/avatar`,
      mimetype: avatar.mimetype,
    };
    await imageRepository.save(avatarInfo.path, buffer2stream(avatar.buffer));
    data.avatar = avatarInfo;
  }
  await offerRepository.saveOffer(data);
  return req.body;
};

const getAvatar = async (req, res) => {
  const date = req.params.date;
  const offer = await offerRepository.getOfferByDate(date);
  if (!offer) {
    throw new NotFoundError(`Offer wasn't found`);
  }

  const avatar = offer.author.avatar;
  if (!avatar) {
    throw new NotFoundError(`There is no avatar for this offer`);
  }

  const {info, stream} = await imageRepository.get(avatar.path);

  if (!info) {
    throw new NotFoundError(`File not found`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
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
  getAvatar,
};
