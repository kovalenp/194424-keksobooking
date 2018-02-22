const server = require(`../server`);

const parsePort = (args) => {
  const p = args[3];
  if (!p) {
    return 3000;
  } else if (isNaN(p)) {
    console.log(`Wrong port: ${p} specified!`);
    process.exit(1);
  }
  return parseInt(p, 10);
};

module.exports = {
  name: `server`,
  description: `Runs http server for specified port (default 3000)`,
  execute(args) {
    const port = parsePort(args);
    server.run(port);
  }
};
