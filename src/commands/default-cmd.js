const fs = require(`fs`);
const {promisify} = require(`util`);
const parser = require(`./src/utils/input-parser`);
const generator = require(`../generator/generator`);
const readline = require(`readline`);

const writeToFile = promisify(fs.writeFile);

const execute = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let data = [];
  let num = await parser.getNumOfElements(rl);
  const path = await parser.getPathToWriteFile(rl);

  while (num > 0) {
    const entity = generator.generateEntity();
    data.push(entity);
    --num;
  }
  try {
    await writeToFile(path, JSON.stringify(data));
  } catch (err) {
    console.log(err.message);
  }
  rl.close();
};

module.exports = {
  name: `default`,
  description: `Run default action`,
  execute
};
