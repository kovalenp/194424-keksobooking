const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Display license`,
  execute() {
    console.log(`${packageInfo.license}`);
    process.exit(0);
  }
};
