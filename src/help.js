const HELP_TEXT = `Доступные команды:
  --help — печатает этот текст;
  --version — печатает версию приложения;
  --author — печатает имя автора;
  --description — печатает описание проекта;
  --license — печатает тип лицензии;`;

module.exports = {
  name: `help`,
  description: `Display help`,
  execute() {
    console.log(HELP_TEXT);
  }
};
