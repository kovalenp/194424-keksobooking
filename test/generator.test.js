const assert = require(`assert`);

const generator = require(`../src/generator/generator`);
const data = require(`../src/data/keksobooking`);

describe(`generateEntity()`, () => {
  describe(`author.avatar`, () => {
    it(`has value like 'http://'`, () => {
      const result = generator.generateEntity();
      assert.ok(result.author.avatar.indexOf(`http://`) !== -1);
    });
  });
  describe(`generateEntity() result`, () => {
    it(`has offer.title in the range of valid values`, () => {
      const result = generator.generateEntity();
      assert.ok(data.TITLES.includes(result.offer.title));
    });
  });
  describe(`generateEntity() result`, () => {
    it(`has offer.address value like {{location.x}}, {{location.y}}`, () => {
      const result = generator.generateEntity();
      assert.equal(result.offer.address, `{{${result.location.x}}, {${result.location.y}}}`);
    });
  });
  // describe(`generateEntity() result`, () => {
  //   it(`has author.avatar like 'http://'`, () => {
  //     const result = generator.generateEntity();
  //     assert.ok(result.author.avatar.indexOf(`http://`) !== -1);
  //   });
  // });
  // describe(`generateEntity() result`, () => {
  //   it(`has author.avatar like 'http://'`, () => {
  //     const result = generator.generateEntity();
  //     assert.ok(result.author.avatar.indexOf(`http://`) !== -1);
  //   });
  // });
});
