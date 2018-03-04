const express = require(`express`);
const bodyParser = require(`body-parser`);

const middleware = require(`./middleware`);
const api = require(`./routes/api`);
const config = require(`../../config`);
const HOSTNAME = `127.0.0.1`;

const app = express();
app.use(express.static(config.STATIC_DIR));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(`/api/`, api.router);
app.use(middleware.errorHandler);

module.exports = {
  run(port) {
    const serverAddress = `http://${HOSTNAME}:${port}`;
    app.listen(port, HOSTNAME, () => {
      console.log(`🌍 running at ${serverAddress}/`);
    });
  },
  app
};
