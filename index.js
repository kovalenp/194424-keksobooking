'use strict';

const VERSION_TEXT = 'v0.0.1';

const HELP_TEXT = `Доступные команды:
  --help    — печатает этот текст;
  --version — печатает версию приложения;`;

const DEFAULT_TEXT = `Привет! Это учебное приложение. Автор: Павел Коваленко.
Используйте "--help" для того чтобы увидеть доступные команды`;

const exit = (code) => {
  process.exit(code);
};

const getErrMsg = (cmd) =>{
  return `Неизвестная команда ${cmd}.
Чтобы прочитать правила использования приложения, наберите "--help"`
};

const doTask = (args) => {
  switch (args) {
    case '--version':
      console.log(VERSION_TEXT);
      exit(0);
      break;
    case '--help':
      console.log(HELP_TEXT);
      exit(0);
      break;
    case undefined:
      console.log(DEFAULT_TEXT);
      exit(0);
      break;
    default:
      const err = getErrMsg(args);
      console.error(err);
      exit(1);
      break;
  }
};

doTask(process.argv[2]); // умеет обрабатывать только одну команду
