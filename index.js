'use strict';

const verText = 'v0.0.1';

const helpText = `Доступные команды:
  --help    — печатает этот текст;
  --version — печатает версию приложения;`;

const defaultText = `Привет! Это учебное приложение. Автор: Павел Коваленко.
Используйте "--help" для того чтобы увидеть доступные команды`;

let exit = (code) => {
  process.exit(code);
};

let errMsg = (cmd) =>{
  return `Неизвестная команда ${cmd}.
Чтобы прочитать правила использования приложения, наберите "--help"`
};

function doTask(args) {
  switch (args) {
    case '--version':
      console.log(verText);
      exit(0);
      break;
    case '--help':
      console.log(helpText);
      exit(0);
      break;
    case undefined:
      console.log(defaultText);
      exit(0);
      break;
    default:
      const err = errMsg(args);
      console.error(err);
      exit(1);
      break;
  }
}

doTask(process.argv[2]); // умеет обрабатывать только одну команду
