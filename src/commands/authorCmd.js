const packageInfo = require(`../../package`);

module.exports = {
  name: `author`,
  description: `Display author info`,
  execute() {
    console.log(`${packageInfo.author}`);
  }
};
