const offerRepository = require(`../../repositories/OfferRepository`);
const imageRepository = require(`../../repositories/ImageRepository`);
const buffer2stream = require(`../../utils/buffer2stream`)

const NotFoundError = require(`../errors/NotFoundError`);
const InternalServerError = require(`../errors/InternalServerError`);

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
    throw new NotFoundError(`File not found`);
  }

  if (!stream) {
    console.log(`Problem loading image`);
    throw new InternalServerError(`File not found`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  return {res, stream};
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
    date: data.date ? String(data.date) : String(Date.now())
  };
};

module.exports = {
  getOffers,
  getOfferByDate,
  addOffer,
  getAvatar,
};
