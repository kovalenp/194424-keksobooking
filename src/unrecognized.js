const buildErrMsg = (cmd) =>{
  return `Unrecognized command: ${cmd}.
Please use "--help" to see the list of the available commands`;
};

const defaultMessage = `You didn't enter any command.
Please use "--help" to see the list of the available commands`;

module.exports = {
  name: `unrecognized`,
  description: `Run default action`,
  execute(cmd) {
    const text = cmd ? buildErrMsg(cmd) : defaultMessage;
    console.log(text);
    process.exit(1);
  }
};
