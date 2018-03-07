const connection = require(`./connection`);
const log = require(`../logger`);

const dbName = process.env.DB_NAME || `htmlacademy`;

module.exports = connection.then((client) => client.db(dbName)).catch((e) => {
  log.error(`Failed to switch database`, e);
  process.exit(1);
});
