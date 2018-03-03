const data = require(`../../storage`);

const getAllOffers = async () => {
  return data;
};

const getOfferByDate = async (date) => {
  return data.find((o) => o.date === Number(date));
};

module.exports = {
  getAllOffers,
  getOfferByDate
};

