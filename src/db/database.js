const connection = require(`./connection`);

module.exports = connection.then((client) => client.db(process.env.DB_NAME)).catch((e) => {
  console.error(`Failed to switch database`, e);
  process.exit(1);
});
