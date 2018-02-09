const author = require(`./src/author`);
const version = require(`./src/version`);
const description = require(`./src/description`);
const license = require(`./src/license`);
const help = require(`./src/help`);

const commands = [author, version, description, license, help];

const parseCommand = () => {
  const cmd = process.argv[2] ? process.argv[2].trim().toLowerCase().replace(`--`, ``) : null;
  if (!cmd) {
    console.log(`Hi there! Please use a command. See "--help" for the inspiration`);
    exit(0);
  }
  return cmd;
};

const exit = (code) => {
  process.exit(code);
};

const getErrMsg = (cmd) =>{
  return `Unrecognized command: ${cmd}.
Please use "--help" to see the list of the available commands`;
};

const cmd = parseCommand();

for (const command of commands) {
  if (command.name === cmd) {
    command.execute();
    exit(0);
  }
}

console.log(getErrMsg(cmd));
exit(1);

