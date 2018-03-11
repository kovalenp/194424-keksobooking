const packageInfo = require(`../../package`);

module.exports = {
  name: `description`,
  description: `Display project description`,
  execute() {
    console.log(`${packageInfo.description}`);
  }
};
