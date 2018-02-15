const colors = require(`colors`);

const author = require(`./author`);
const version = require(`./version`);
const description = require(`./description`);
const license = require(`./license`);

const otherCommands = [author, version, description, license];

const NAME = `help`;
const HELP_DESCRIPTION = `Display help`;

const helpText = `List of available commands:
${[{name: NAME, description: HELP_DESCRIPTION}, ...otherCommands].map((cmd) => `${colors.grey(`--${cmd.name}`)}\t${colors.green(`- ${cmd.description}`)}`).join(`;\n`)}`;

module.exports = {
  name: NAME,
  description: HELP_DESCRIPTION,
  execute() {
    console.log(helpText);
    process.exit(0);
  }
};


