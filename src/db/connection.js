const {MongoClient} = require(`mongodb`);
const log = require(`../logger`);
const url = process.env.DB_HOST || `mongodb://localhost:27017/`;

let connection = null;
module.exports = () => {
  if (!connection) {
    connection = MongoClient.connect(url).catch((e) => {
      log.error(`Failed to connect to MongoDB`, e);
      process.exit(1);
    });
  }
  return connection;
};
