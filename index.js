const author = require(`./src/cliCommands/author`);
const version = require(`./src/cliCommands/version`);
const description = require(`./src/cliCommands/description`);
const license = require(`./src/cliCommands/license`);
const unrecognized = require(`./src/cliCommands/unrecognized`);
const help = require(`./src/cliCommands/help`);
const defaultCmd = require(`./src/cliCommands/defaultCmd`);
const server = require(`./src/server`);

const commands = [author, version, description, license, help, unrecognized];
const cmd = process.argv[2] ? process.argv[2].trim().toLowerCase() : null;

const parsePort = () => {
  const p = process.argv[3];
  if (!p) {
    return 3000;
  } else if (isNaN(p)) {
    console.log(`Wrong port: ${p} specified!`);
    process.exit(1);
  }
  return p;
};

if (!cmd) {
  defaultCmd.execute().catch(console.error);
} else if (cmd === `--server`) {
  const port = parsePort();
  server.run(port);
} else {
  const cmdToExecute = commands.find((command) => `--${command.name}` === cmd) || unrecognized.execute(cmd);
  cmdToExecute.execute();
}

