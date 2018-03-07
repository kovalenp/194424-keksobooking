const connection = require(`./connection`);

module.exports = connection.then((client) => client.db(`htmlacademy`)).catch((e) => {
  console.error(`Failed to switch database`, e);
  process.exit(1);
});
