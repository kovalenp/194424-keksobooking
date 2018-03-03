const request = require(`supertest`);
const express = require(`express`);

const app = express();

describe(`GET api/offers`, function () {
  it(`respond with HTTP 200`, function (done) {
    request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200, done);
  });
});

describe(`GET api/offers/{date}>`, function () {
  it(`respond with HTTP 200`, function (done) {
    request(app)
        .get(`/api/offers/154541243`)
        .set(`Accept`, `application/json`)
        .expect(200, done);
  });
});
