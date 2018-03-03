const express = require(`express`);

const api = require(`./routes/api`);
const config = require(`../../config`);
const HOSTNAME = `127.0.0.1`;

const app = express();
app.use(express.static(config.STATIC_DIR));

app.use(`/api/`, api.router);

module.exports = {
  run(port) {
    const serverAddress = `http://${HOSTNAME}:${port}`;
    app.listen(port, HOSTNAME, () => {
      console.log(`🌍 running at ${serverAddress}/`);
    });
  },
  app
};
