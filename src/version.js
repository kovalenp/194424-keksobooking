const packageInfo = require(`../package.json`);

const paintVersion = () =>{
  const version = packageInfo.version.split(`.`);
  return `${version[0].red}.${version[1].green}.${version[2].blue}`;
}

module.exports = {
  name: `version`,
  description: `Display program version`,
  execute() {
    console.log(`v${paintVersion()}`);
    process.exit(0);
  }
};
