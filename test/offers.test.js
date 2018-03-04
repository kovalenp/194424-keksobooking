/* eslint-disable */
const request = require(`supertest`);
const repo = require(`../src/repository`);
const assert = require(`assert`);

const {app} = require("../src/server");

const TEST_OFFER = {
  author: {
    name: `Pavel`,
    avatar: `api/offers/Pavel/avatar`
  },
  offer: {
    title: `Маленькая квартирка рядом с парком`,
    address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
    description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
    pric: 30000,
    type: `flat`,
    rooms: 1,
    guests: 1,
    checkin: `9:00`,
    checkout: `7:00`,
    features: [`elevator`, `conditioner`]
  },
  location: {
    x: 471,
    y: 545
  },
  date: 1519136255300
};

describe(`Offers REST endpoints tests`, function () {
  before(async () => {
    await repo.deleteAll();
    await repo.saveOffer(TEST_OFFER);
  });

  describe(`GET`, function () {
    it(`api/offers respond with HTTP 200 and query params set to default`, async () => {
      const result = await request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200);
      assert.equal(result.body.skip, 0);
      assert.equal(result.body.limit, 20);
    });

    it(`api/offers respond with expected offer data`, async () => {
      const result = await request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200);
      assert.equal(result.body.total, 1);
      assert.equal(result.body.data[0].author.name,`Pavel`);
    });

    it(`api/offers can pass query params values`, async () => {
      const result = await request(app)
        .get(`/api/offers?skip=1&limit=2`)
        .set(`Accept`, `application/json`)
        .expect(200);
      assert.equal(result.body.skip, 1);
      assert.equal(result.body.limit, 2);
    });

    it(`api/offers respond with HTTP 404 for non existing offer`, function (done) {
      request(app)
        .get(`/api/offers/noSuchOfferExists`)
        .set(`Accept`, `application/json`)
        .expect(404, done);
    });
  });

  describe(`POST`, function () {
    it(`api/offers post a new onj`, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .set(`Content-Type`, `application/json`)
        .send({
          author: {
            name: `postTest`,
          }
        })
        .expect(200);
    });
  });
});
