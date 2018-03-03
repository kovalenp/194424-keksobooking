const request = require(`supertest`);
const express = require(`express`);
const api = require(`../src/server/routes/api`);

const app = express();
app.use(`/api/`, api.router);

describe(`GET api/offers`, function () {
  it(`respond with HTTP 200`, function (done) {
    request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200, done);
  });
});

describe(`GET api/offers/{date}>`, function () {
  it(`respond with HTTP 404 for non existing offer`, function (done) {
    request(app)
        .get(`/api/offers/noSuchOfferExists`)
        .set(`Accept`, `application/json`)
        .expect(404, done);
  });
});
