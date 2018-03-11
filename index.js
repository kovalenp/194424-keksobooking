require(`dotenv`).config();
const author = require(`./src/commands/author-cmd`);
const version = require(`./src/commands/version-cmd`);
const description = require(`./src/commands/description-cmd`);
const license = require(`./src/commands/license-cmd`);
const unrecognized = require(`./src/commands/unrecognized-cmd`);
const help = require(`./src/commands/help-cmd`);
const defaultCmd = require(`./src/commands/default-cmd`);
const serverCmd = require(`./src/commands/server-cmd`);

const commands = [author, version, description, license, help, serverCmd, unrecognized];
const cmd = process.argv[2] ? process.argv[2].trim().toLowerCase() : null;

if (!cmd) {
  defaultCmd.execute().catch(console.error);
} else {
  const cmdToExecute = commands.find((command) => `--${command.name}` === cmd) || unrecognized.execute(cmd);
  cmdToExecute.execute(process.argv);
}

