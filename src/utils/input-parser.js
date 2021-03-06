const colors = require(`colors`);

const fs = require(`fs`);

const repeatQuestion = async (rl, func) => {
  let result;
  do {
    result = await func(rl);
  } while (!result);
  return result;
};

const askForParam = async (rl) => {
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

const getPathToWriteFile = (rl) => {
  return new Promise((resolve) => {
    rl.question(`Where to save data?\n`, async (path) => {
      if (fs.existsSync(path)) {
        console.log(`${colors.red(`${path}`)} already exist!`);
        let result = await repeatQuestion(rl, shallRewrite);
        if (!result) {
          return resolve(null);
        }
      }
      return resolve(path);
    });
  });
};

const shallRewrite = (rl) => {
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
  getNumOfElements: (rl) => repeatQuestion(rl, askForParam),
  getPathToWriteFile
};
