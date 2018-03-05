const {isNumber, inRange, oneOf, textRange, isTime, anyOf} = require(`../assertion`);
const data = require(`../../../data/keksobooking`);

const getOffersSchema = {
  'skip': {
    required: false,
    assertions: [
      isNumber()
    ]
  },
  'limit': {
    required: false,
    assertions: [
      isNumber()
    ]
  },
};

const postOfferSchema = {
  'title': {
    required: true,
    assertions: [
      textRange(30, 140)
    ]
  },
  'type': {
    required: true,
    assertions: [
      oneOf(data.TYPES)
    ]
  },
  'price': {
    required: true,
    assertions: [
      isNumber(),
      inRange(1, 100000),
    ]
  },
  'address': {
    required: true,
    assertions: [
      textRange(0, 100)
    ]
  },
  'checkin': {
    required: true,
    assertions: [
      isTime()
    ]
  },
  'checkout': {
    required: true,
    assertions: [
      isTime()
    ]
  },
  'rooms': {
    required: true,
    assertions: [
      isNumber(),
      inRange(1, 100000),
    ]
  },
  'features': {
    required: false,
    assertions: [
      anyOf(data.FEATURES),
    ]
  },
};

const postAuthorSchema = {
  'avatar': {
    required: false,
    assertions: [
      textRange(0, 100)
    ]
  },
  'name': {
    required: false,
    assertions: [
      textRange(0, 100)
    ]
  },
};

module.exports = {
  getOffersSchema,
  postOfferSchema,
  postAuthorSchema,
};
