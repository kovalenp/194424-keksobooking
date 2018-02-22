const author = require(`./src/cliCommands/author`);
const version = require(`./src/cliCommands/version`);
const description = require(`./src/cliCommands/description`);
const license = require(`./src/cliCommands/license`);
const unrecognized = require(`./src/cliCommands/unrecognized`);
const help = require(`./src/cliCommands/help`);
const defaultCmd = require(`./src/cliCommands/defaultCmd`);
const serverCmd = require(`./src/cliCommands/serverCmd`);

const commands = [author, version, description, license, help, serverCmd, unrecognized];
const cmd = process.argv[2] ? process.argv[2].trim().toLowerCase() : null;

if (!cmd) {
  defaultCmd.execute().catch(console.error);
} else {
  const cmdToExecute = commands.find((command) => `--${command.name}` === cmd) || unrecognized.execute(cmd);
  cmdToExecute.execute(process.argv);
}

