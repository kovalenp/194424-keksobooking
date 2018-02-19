const fs = require(`fs`);
const {promisify} = require(`util`);
const parser = require(`../utils/inputParser`);
const generator = require(`../generator/generator`);

const writeToFile = promisify(fs.writeFile);

const execute = async () => {
  let data = [];
  let num = await parser.getNumOfElements();
  const path = await parser.getPathToWriteFile();

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
  process.exit(0);
};

module.exports = {
  name: `default`,
  description: `Run default action`,
  execute
};
