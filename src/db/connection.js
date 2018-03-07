const {MongoClient} = require(`mongodb`);

const url = process.env.DB_HOST;

module.exports = MongoClient.connect(url).catch((e) => {
  console.error(`Failed to connect to MongoDB`, e);
  process.exit(1);
});
