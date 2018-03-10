const express = require(`express`);
const bodyParser = require(`body-parser`);

const middleware = require(`./middleware`);
const api = require(`./routes/api`);
const config = require(`../../config`);
const log = require(`../logger`);
const {initCollection} = require(`../repositories/offerRepository`);

const HOSTNAME = process.env.HOST || `127.0.0.1`;

const app = express();
app.use(express.static(config.STATIC_DIR));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(`/api/`, api.router);
app.use(middleware.errorHandler);

module.exports = {
  async run(port) {
    try {
      await initCollection();
    } catch (err) {
      log.error(`Can't initialize DB connection`, err);
      process.exit(1);
    }
    const serverAddress = `http://${HOSTNAME}:${port}`;
    app.listen(port, HOSTNAME, () => {
      log.info(`🌍 running at ${serverAddress}/`);
    });
  },
  app
};
