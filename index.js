const author = require(`./src/author`);
const version = require(`./src/version`);
const description = require(`./src/description`);
const license = require(`./src/license`);
const unrecognized = require(`./src/unrecognized`);
const help = require(`./src/help`);

const commands = [author, version, description, license, help, unrecognized];
const cmd = process.argv[2] ? process.argv[2].trim().toLowerCase() : null;

const cmdToExecute = commands.find((command)=>`--${command.name}` === cmd) || unrecognized.execute(cmd);
cmdToExecute.execute();
