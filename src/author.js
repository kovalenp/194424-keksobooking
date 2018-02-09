const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `Display author info`,
  execute() {
    console.log(`${packageInfo.author}`);
  }
};
