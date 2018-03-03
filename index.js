const author = require(`./src/commands/authorCmd`);
const version = require(`./src/commands/versionCmd`);
const description = require(`./src/commands/descriptionCmd`);
const license = require(`./src/commands/licenseCmd`);
const unrecognized = require(`./src/commands/unrecognizedCmd`);
const help = require(`./src/commands/helpCmd`);
const defaultCmd = require(`./src/commands/defaultCmd`);
const serverCmd = require(`./src/commands/serverCmd`);

const commands = [author, version, description, license, help, serverCmd, unrecognized];
const cmd = process.argv[2] ? process.argv[2].trim().toLowerCase() : null;

if (!cmd) {
  defaultCmd.execute().catch(console.error);
} else {
  const cmdToExecute = commands.find((command) => `--${command.name}` === cmd) || unrecognized.execute(cmd);
  cmdToExecute.execute(process.argv);
}

