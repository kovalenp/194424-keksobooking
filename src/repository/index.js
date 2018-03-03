const fs = require(`fs`);
const {promisify} = require(`util`);
const data = require(`../../storage/storage`);
const config = require(`../../config`);

const writeToFile = promisify(fs.writeFile);

const getAllOffers = async () => {
  return data;
};

const getOfferByDate = async (date) => {
  return data.find((o) => o.date === Number(date));
};

const saveAvatar = async (buffer) => {
  await writeToFile(config.STORAGE_DIR + `/images/temp.png`, buffer);
};

const saveOffer = async (offer) => {
  data.push(offer);
  await writeToFile(config.STORAGE_DIR + `/storage.json`, JSON.stringify(data));
};

module.exports = {
  getAllOffers,
  getOfferByDate,
  saveAvatar,
  saveOffer,
};

