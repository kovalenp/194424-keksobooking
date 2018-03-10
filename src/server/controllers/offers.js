const offerRepository = require(`../../repositories/offerRepository`);
const imageRepository = require(`../../repositories/imageRepository`);
const buffer2stream = require(`../../utils/buffer2stream`);
const {normalizeOffer} = require(`../../utils/normalization`);
const log = require(`../../logger`);

const NotFoundError = require(`../errors/NotFoundError`);
const InternalServerError = require(`../errors/InternalServerError`);

const DEFAULT_SKIP_PARAMETER = 0;
const DEFAULT_LIMIT_PARAMETER = 20;

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
  const data = normalizeOffer(req.body);
  const avatar = req.file;
  if (avatar) {
    const avatarInfo = {
      path: `/api/offers/${data.date}/avatar`,
      mimetype: avatar.mimetype,
    };
    data.avatar = avatarInfo;
    data.author.avatar = avatarInfo.path;
  }
  await offerRepository.saveOffer(data);
  if (avatar) {
    await imageRepository.save(data.avatar.path, buffer2stream(avatar.buffer));
  }
  return req.body;
};

const getAvatar = async (req, res) => {
  const date = req.params.date;
  const offer = await offerRepository.getOfferByDate(date);
  if (!offer) {
    throw new NotFoundError(`Offer wasn't found`);
  }

  const avatar = offer.avatar;
  if (!avatar) {
    throw new NotFoundError(`There is no avatar for this offer`);
  }

  const {info, stream} = await imageRepository.get(avatar.path);

  if (!info) {
    throw new NotFoundError(`File ${avatar.path} not found`);
  }

  if (!stream) {
    log.error(`Problem loading image ${avatar.path}`);
    throw new InternalServerError(`File not found`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  return {res, stream};
};

const toPage = async (offers, skip = DEFAULT_SKIP_PARAMETER, limit = DEFAULT_LIMIT_PARAMETER) => {
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
