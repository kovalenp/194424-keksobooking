const colors = require(`colors`);

const author = require(`./authorCmd`);
const version = require(`./versionCmd`);
const description = require(`./descriptionCmd`);
const license = require(`./licenseCmd`);
const server = require(`./serverCmd`);

const otherCommands = [author, version, description, license, server];

const NAME = `help`;
const HELP_DESCRIPTION = `Display help`;

const helpText = `List of available commands:
${[{name: NAME, description: HELP_DESCRIPTION}, ...otherCommands].map((cmd) => `${colors.grey(`--${cmd.name}`)}\t${colors.green(`- ${cmd.description}`)}`).join(`;\n`)}`;

module.exports = {
  name: NAME,
  description: HELP_DESCRIPTION,
  execute() {
    console.log(helpText);
  }
};


