const colors = require(`colors`);

const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `Display author info`,
  execute() {
    console.log(`${colors.random(packageInfo.author)}`);
    process.exit(0);
  }
};
