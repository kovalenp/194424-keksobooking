const colors = require(`colors`);

const author = require(`./author`);
const version = require(`./version`);
const description = require(`./description`);
const license = require(`./license`);

const otherCommands = [author, version, description, license];

const name = `help`;
const helpDescription = `Display help`;

const HELP_TEXT = `List of available commands:
${[this, ...otherCommands].map((cmd) => `${colors.grey(`--${cmd.name}`)}\t${colors.green(`- ${cmd.description}`)}`).join(`;\n`)}`; // eslint-disable-line

module.exports = {
  name,
  description: helpDescription,
  execute() {
    console.log(HELP_TEXT);
    process.exit(0);
  }
};


