'use strict';

const verText = 'v0.0.1';

const helpText = `Доступные команды:
  --help    — печатает этот текст;
  --version — печатает версию приложения;`;

const defaultText = `Привет! Это учебное приложение. Автор: Павел Коваленко.
Используйте "--help" для того чтобы увидеть доступные команды`;

function doTask(args) {
  switch (args) {
    case '--version':
      console.log(verText);
      break;
    case '--help':
      console.log(helpText);
      break;
    case undefined:
      console.log(defaultText);
      break;
    default:
      const err = errMsg(args);
      console.error(err);
  }
}

function errMsg(cmd){
  return `Неизвестная команда ${cmd}.
Чтобы прочитать правила использования приложения, наберите "--help"`
}

doTask(process.argv[2]); // умеет обрабатывать только одну команду
