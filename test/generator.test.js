const assert = require(`assert`);

const generator = require(`../src/generator/generator`);
const data = require(`../src/data/keksobooking`);

describe(`generateEntity()`, () => {
  describe(`author.avatar`, () => {
    it(`is a string which contains url 'http://robohash.org/'`, () => {
      const result = generator.generateEntity();
      assert.ok(result.author.avatar.indexOf(`http://robohash.org/`) !== -1);
      assert.equal(typeof result.author.avatar, `string`);
    });
  });
  describe(`offer.title`, () => {
    it(`is a string in the range of valid values from data.TITLES`, () => {
      const result = generator.generateEntity();
      assert.ok(data.TITLES.includes(result.offer.title));
      assert.equal(typeof result.offer.title, `string`);
    });
  });
  describe(`offer.address`, () => {
    it(`is a string in format '{location.x}, {location.y}'`, () => {
      const result = generator.generateEntity();
      assert.equal(result.offer.address, `${result.location.x}, ${result.location.y}`);
    });
  });
  describe(`offer.price`, () => {
    it(`is a number in range (1000, 1000000)`, () => {
      const result = generator.generateEntity();
      assert.ok(result.location.x >= 100 && result.location.x <= 1000000);
      assert.equal(typeof result.offer.price, `number`);
    });
  });
  describe(`offer.type`, () => {
    it(`is a string in the range of valid values from data.TYPES`, () => {
      const result = generator.generateEntity();
      assert.ok(data.TYPES.includes(result.offer.type));
      assert.equal(typeof result.offer.type, `string`);
    });
  });
  describe(`offer.rooms`, () => {
    it(`is a number in range (1, 5)`, () => {
      const result = generator.generateEntity();
      assert.ok(result.offer.rooms >= 1 && result.offer.rooms <= 5);
      assert.equal(typeof result.offer.price, `number`);
    });
  });
  describe(`offer.guests`, () => {
    it(`is a number in range (1, 20)`, () => {
      const result = generator.generateEntity();
      assert.ok(result.offer.guests >= 1 && result.offer.guests <= 20);
      assert.equal(typeof result.offer.price, `number`);
    });
  });
  describe(`offer.checkin`, () => {
    it(`is a string in the range of valid values from data.TIMES`, () => {
      const result = generator.generateEntity();
      assert.ok(data.TIMES.includes(result.offer.checkin));
      assert.equal(typeof result.offer.type, `string`);
    });
  });
  describe(`offer.checkot`, () => {
    it(`is a string in the range of valid values from data.TIMES`, () => {
      const result = generator.generateEntity();
      assert.ok(data.TIMES.includes(result.offer.checkout));
      assert.equal(typeof result.offer.type, `string`);
    });
  });
  describe(`offer.features`, () => {
    it(`is an array with the values from data.FEATURES`, () => {
      const result = generator.generateEntity();
      assert.ok(result.offer.features.every(e => data.FEATURES.indexOf(e) > -1)); //eslint-disable-line
    });
  });
  describe(`offer.description`, () => {
    it(`is an empty string`, () => {
      const result = generator.generateEntity();
      assert.equal(result.offer.description, ``);
    });
  });
  describe(`offer.photos`, () => {
    it(`is an array length 3 with the values from data.PHOTOS`, () => {
      const result = generator.generateEntity();
      assert.ok(result.offer.photos.every(e => data.PHOTOS.indexOf(e) > -1)); //eslint-disable-line
      assert.equal(result.offer.photos.length, 3);
    });
  });
  describe(`location.x`, () => {
    it(`is a number in range (300, 900)`, () => {
      const result = generator.generateEntity();
      assert.ok(result.location.x >= 300 && result.location.x <= 900);
      assert.equal(typeof result.location.x, `number`);
    });
  });
  describe(`location.y`, () => {
    it(`is a number in range (150, 500)`, () => {
      const result = generator.generateEntity();
      assert.ok(result.location.y >= 150 && result.location.y <= 500);
      assert.equal(typeof result.location.y, `number`);
    });
  });
});
