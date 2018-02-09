const author = require(`./src/author`);
const version = require(`./src/version`);
const description = require(`./src/description`);
const license = require(`./src/license`);
const help = require(`./src/help`);

const commands = {author, version, description, license, help};

const getCommand = () => {
  return process.argv[2] ? process.argv[2].trim().toLowerCase().replace(`--`, ``) : null;
};

const exit = (code) => {
  process.exit(code);
};

const getErrMsg = (cmd) =>{
  return `Неизвестная команда ${cmd}.
Чтобы прочитать правила использования приложения, наберите "--help"`;
};

const cmd = getCommand();

if (!commands[cmd]) {
  console.log(getErrMsg(cmd));
  exit(1);
}
commands[cmd].execute();

