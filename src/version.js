const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Display program version`,
  execute() {
    console.log(`v${packageInfo.version}`);
    process.exit(0);
  }
};
