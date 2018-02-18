const parser = require(`../utils/inputParser`);

module.exports = {
  name: `default`,
  description: `Run default action`,
  async execute() {
    const num = await parser.askNumOfElements();
    const path = await parser.askPathToWriteFile();
    console.log(`${num} and ${path}`);
    process.exit(0);
  }
};
