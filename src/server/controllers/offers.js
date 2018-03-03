const getOffers = async (req) => {
  console.log(req.query);
  return {response: `All offers`};
};

module.exports = {
  getOffers,
};
