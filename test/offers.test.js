/* eslint-disable */
const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server`);
const connection = require(`../src/db/connection`);
const repo = require(`../src/repositories/offerRepository`);
const {normalizeOffer} = require(`../src/utils/normalization`);

const TEST_OFFER = {
    name: `Pavel`,
    title: `Маленькая квартирка рядом с парком`,
    address: `378, 856`, // this is how the address comes from multiform (although spec states differently)
    description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
    price: 30000,
    type: `flat`,
    rooms: 1,
    guests: 1,
    checkin: `9:00`,
    checkout: `7:00`,
    features: [`elevator`, `conditioner`],
};

describe(`Offers REST endpoints tests`, function () {
  this.timeout(3000);
  before(async () => {
    await repo.initCollection();
    await repo.removeOffers({'offer.description': TEST_OFFER.description});
    await repo.saveOffer(normalizeOffer(TEST_OFFER));
  });

  after(async () => {
    return (await connection()).close();
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
      assert.equal(result.body.data[0].author.name, TEST_OFFER.name);
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
    before(async () => {
      await repo.removeOffers({'offer.description': TEST_OFFER.description});
    });
    it(`api/offers add a new offer from data passed as json`, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .set(`Content-Type`, `application/json`)
        .send(TEST_OFFER)
        .expect(200);
      assert.equal(result.body.name, TEST_OFFER.name);
    });

    it(`api/offers add a new offer from data passed as formdata`, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .field(`name`, TEST_OFFER.name)
        .field(`title`, TEST_OFFER.title + ` as form`)
        .field(`address`, TEST_OFFER.address)
        .field(`description`, TEST_OFFER.description)
        .field(`price`, TEST_OFFER.price)
        .field(`guests`, TEST_OFFER.guests)
        .field(`type`, TEST_OFFER.type)
        .field(`rooms`, TEST_OFFER.rooms)
        .field(`checkin`, TEST_OFFER.checkin)
        .field(`checkout`, TEST_OFFER.checkout)
        .expect(200);
      assert.equal(result.body.name, TEST_OFFER.name);
    });

    it(`api/offers add avatar image`, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .field(`name`, TEST_OFFER.name)
        .field(`title`, TEST_OFFER.title + ` with panda`)
        .field(`address`, TEST_OFFER.address)
        .field(`description`, TEST_OFFER.description)
        .field(`price`, TEST_OFFER.price)
        .field(`guests`, TEST_OFFER.guests)
        .field(`type`, TEST_OFFER.type)
        .field(`rooms`, TEST_OFFER.rooms)
        .field(`checkin`, TEST_OFFER.checkin)
        .field(`checkout`, TEST_OFFER.checkout)
        .attach(`avatar`, `${__dirname}/testData/panda.jpg`)
        .expect(200);
      assert.equal(result.body.name, TEST_OFFER.name);
    });
  });

  describe(`POST validation`, function () {
    it(`title is too short `, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .set(`Content-Type`, `application/json`)
        .send({
            title: `1`,
            address: `some test address`,
            description: `some test description`,
            price: 3000,
            type: `flat`,
            rooms: 1,
            guests: 1,
            checkin: `20:39`,
            checkout: `7:00`,
            features: [`elevator`, `conditioner`]
        })
        .expect(400);
      assert(result.body[0].parameter.includes(`title`));
    });
    it(`title is too long `, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .set(`Content-Type`, `application/json`)
        .send({
            title: 't'.repeat(141),
            address: `some test address`,
            description: `some test description`,
            price: 3000,
            type: `flat`,
            rooms: 1,
            guests: 1,
            checkin: `20:39`,
            checkout: `7:00`,
            features: [`elevator`, `conditioner`]
        })
        .expect(400);
      assert(result.body[0].parameter.includes(`title`));
    });
    it(`wrong chcekin time`, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .set(`Content-Type`, `application/json`)
        .send({
            title: `some test title long enough to pass the test`,
            address: `some test address`,
            description: `some test description`,
            price: 3000,
            type: `flat`,
            rooms: 1,
            guests: 1,
            checkin: `20:99`,
            checkout: `7:00`,
            features: [`elevator`, `conditioner`]
        })
        .expect(400);
      assert(result.body[0].parameter.includes(`checkin`));
    });
    // the rest of validation tests goes here
  });
});
