/* eslint-disable */
const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server`);
const connection = require("../src/db/connection");
const repo = require(`../src/repositories/OfferRepository`);

const TEST_OFFER = {
  author: {
    name: `Pavel`,
    avatar: `api/1519136255300/Pavel/avatar`
  },
  offer: {
    title: `This is a unit test offer which is just about 30 chars`,
    address: `90210 Beverly Hills test address, California, US`,
    description: `unit-test`,
    price: 30000,
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
  date: `1519136255300`
};

describe(`Offers REST endpoints tests`, function () {
  this.timeout(3000);
  before(async () => {
    await repo.removeOffers({'offer.description': TEST_OFFER.offer.description});
    await repo.saveOffer(TEST_OFFER);
  });

  after(async () => {
    return (await connection).close();
  });

  describe(`GET`, function () {


    it(`api/offers respond with HTTP 200 and query params set to default`, async () => {
      const result = await request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200);
      assert.equal(result.body.skip, 0);
      assert.equal(result.body.limit, 20);
    }).timeout(5000);

    it(`api/offers respond with expected offer data`, async () => {
      const result = await request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200);
      assert.equal(result.body.total, 1);
      assert.equal(result.body.data[0].author.name, TEST_OFFER.author.name);
    }).timeout(5000);

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
      await repo.removeOffers({'offer.description': TEST_OFFER.offer.description});
    });
    it(`api/offers add a new offer from data passed as json`, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .set(`Content-Type`, `application/json`)
        .send(TEST_OFFER)
        .expect(200);
      assert.equal(result.body.author.name, TEST_OFFER.author.name);
    });

    it(`api/offers add a new offer from data passed as formdata`, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .field(`author[name]`, TEST_OFFER.author.name)
        .field(`offer[title]`, TEST_OFFER.offer.title + ` as form`)
        .field(`offer[address]`, TEST_OFFER.offer.address)
        .field(`offer[description]`, TEST_OFFER.offer.description)
        .field(`offer[price]`, TEST_OFFER.offer.price)
        .field(`offer[guests]`, TEST_OFFER.offer.guests)
        .field(`offer[type]`, TEST_OFFER.offer.type)
        .field(`offer[rooms]`, TEST_OFFER.offer.rooms)
        .field(`offer[checkin]`, TEST_OFFER.offer.checkin)
        .field(`offer[checkout]`, TEST_OFFER.offer.checkout)
        .expect(200);
      assert.equal(result.body.author.name, TEST_OFFER.author.name);
    });

    it(`api/offers add avatar image`, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .field(`author[name]`, TEST_OFFER.author.name)
        .field(`offer[title]`, TEST_OFFER.offer.title + ` with panda`)
        .field(`offer[address]`, TEST_OFFER.offer.address)
        .field(`offer[description]`, TEST_OFFER.offer.description)
        .field(`offer[price]`, TEST_OFFER.offer.price)
        .field(`offer[guests]`, TEST_OFFER.offer.guests)
        .field(`offer[type]`, TEST_OFFER.offer.type)
        .field(`offer[rooms]`, TEST_OFFER.offer.rooms)
        .field(`offer[checkin]`, TEST_OFFER.offer.checkin)
        .field(`offer[checkout]`, TEST_OFFER.offer.checkout)
        .attach(`avatar`, `${__dirname}/testData/panda.jpg`)
        .expect(200);
      assert.equal(result.body.author.name, TEST_OFFER.author.name);
    });
  });

  describe(`POST validation`, function () {

    it(`title is too short `, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .set(`Content-Type`, `application/json`)
        .send({
          offer: {
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
          }
        })
        .expect(400);
      assert(result.body[0].parameter.includes(`title`));
    });

    it(`title is too long `, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .set(`Content-Type`, `application/json`)
        .send({
          offer: {
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
          }
        })
        .expect(400);
      assert(result.body[0].parameter.includes(`title`));
    });

    it(`wrong chcekin time`, async () => {
      const result = await request(app)
        .post(`/api/offers`)
        .set(`Content-Type`, `application/json`)
        .send({
          offer: {
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
          }
        })
        .expect(400);
      assert(result.body[0].parameter.includes(`checkin`));
    });

    // the rest of validation tests goes here
  });
});
