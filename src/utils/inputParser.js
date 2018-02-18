const colors = require(`colors`);

const fs = require(`fs`);
const readline = require(`readline`);


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  promt: `>`
});

function askNumOfElements() {
  return new Promise((resolve) => {
    rl.question(`How many data entities to generate?\n`, (num) => {
      if (isNaN(num)) {
        console.log(`${colors.red(`${num}`)} is not a number\n`);
        return askNumOfElements(); // recursion in Promise function ?
      }
      return resolve(num);
    });
  });
}

function askPathToWriteFile() {
  return new Promise((resolve) => {
    rl.question(`Where to save data?\n`, (path) => {
      console.log(path);
      if (fs.existsSync(path)) {
        console.log(`${colors.red(`${path}`)} already exist\n`);
        rl.close();
      }
      return resolve(path);
    });
  });
}

module.exports = {askNumOfElements, askPathToWriteFile};
