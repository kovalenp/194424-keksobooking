const {MongoClient} = require(`mongodb`);
const log = require(`../logger`);
const url = process.env.DB_HOST;

module.exports = MongoClient.connect(url).catch((e) => {
  log.error(`Failed to connect to MongoDB`, e);
  process.exit(1);
});
