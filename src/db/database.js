const connection = require(`./connection`);
const log = require(`../logger`);

module.exports = connection.then((client) => client.db(process.env.DB_NAME)).catch((e) => {
  log.error(`Failed to switch database`, e);
  process.exit(1);
});
