const packageInfo = require(`../../package`);

module.exports = {
  name: `license`,
  description: `Display license`,
  execute() {
    console.log(`${packageInfo.license}`);
  }
};
