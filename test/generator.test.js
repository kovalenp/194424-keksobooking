const assert = require(`assert`);
const generator = require(`../src/generator/generator`);

describe(`generateEntity() result`, () => {
  describe(`has author.avatar like 'http://'`, () => {
    it(`should return -1 when the value is not present`, () => {
      const result = generator.generateEntity();
      assert.ok(result.author.avatar.indexOf(`http://`) !== -1);
    });
  });
});
