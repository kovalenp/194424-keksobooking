const author = require(`./author`);
const version = require(`./version`);
const description = require(`./description`);
const license = require(`./license`);

const name = `help`;
const helpDescription = `Display help`;

const HELP_TEXT = `List of available commands:
  --${name} — ${helpDescription};
  --${version.name} — ${version.description};
  --${author.name} — ${author.description};
  --${description.name} — ${description.description};
  --${license.name} — ${license.description};`;

module.exports = {
  name,
  description: helpDescription,
  execute() {
    console.log(HELP_TEXT);
    process.exit(0);
  }
};
