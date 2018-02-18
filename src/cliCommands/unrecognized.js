const buildErrMsg = (cmd) =>{
  return `Unrecognized command: ${cmd}.
Please use "--help" to see the list of the available commands`;
};

module.exports = {
  name: `unrecognized`,
  description: `Run default action`,
  execute(cmd) {
    console.log(buildErrMsg(cmd));
    process.exit(1);
  }
};
