const {isNumber} = require(`../assertion`);

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

module.exports = {
  getOffersSchema,
  postOfferSchema
};
