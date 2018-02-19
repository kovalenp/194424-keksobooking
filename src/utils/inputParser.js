const colors = require(`colors`);

const fs = require(`fs`);
const readline = require(`readline`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const repeatQuestion = async (func) => {
  let result;
  do {
    result = await func();
  } while (!result);
  return result;
};

const askForParam = async () => {
  return new Promise((resolve) => {
    rl.question(`How many data entities to generate?\n`, (num) => {
      if (isNaN(num)) {
        console.log(`${colors.red(`${num}`)} is not a number`);
        return resolve(null);
      }
      return resolve(num);
    });
  });
};

const getPathToWriteFile = () => {
  return new Promise((resolve) => {
    rl.question(`Where to save data?\n`, async (path) => {
      if (fs.existsSync(path)) {
        console.log(`${colors.red(`${path}`)} already exist!`);
        let result = await repeatQuestion(shallRewrite);
        if (!result) {
          return resolve(null);
        }
      }
      return resolve(path);
    });
  });
};

const shallRewrite = () => {
  return new Promise((resolve) => {
    rl.question(`Do you want to rewrite it? ${colors.green(`y/n`)}\n`, (answer) => {
      if (answer === `y`) {
        resolve(true);
      }
      if (answer === `n`) {
        console.log(`Your wish is my command!`);
        process.exit(0);
      } else {
        resolve(null);
      }
    });
  });
};

module.exports = {
  getNumOfElements: () => repeatQuestion(askForParam),
  getPathToWriteFile
};
