const connection = require(`./connection`);
const log = require(`../logger`);

const dbName = process.env.DB_NAME || `htmlacademy`;

let database = null;
module.exports = () => {
  if (!database) {
    database = connection().then((client) => client.db(dbName)).catch((e) => {
      log.error(`Failed to connect to ${dbName} database`, e);
      process.exit(1);
    });
  }
  return database;
};
