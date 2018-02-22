const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const config = require(`../../config`);
const {resolve} = require(`./contentTypes`);

const readfile = promisify(fs.readFile);
const HOSTNAME = `127.0.0.1`;

const readFile = async (targetPath, res) => {
  const data = await readfile(targetPath);
  res.setHeader(`content-type`, resolve(targetPath));
  res.setHeader(`content-length`, data.length);
  res.end(data);
};

const server = http.createServer((req, res) => {
  let absolutePath;
  if (req.url === `/`) {
    absolutePath = config.STATIC_DIR + `/index.html`;
  } else {
    absolutePath = config.STATIC_DIR + url.parse(req.url).pathname;
  }

  (async () => {
    try {
      res.statusCode = 200;
      res.statusMessage = `OK`;
      await readFile(absolutePath, res);
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {
      'content-type': `text/plain`
    });
    res.end(e.message);
  });
});

module.exports = {
  run(port) {
    const serverAddress = `http://${HOSTNAME}:${port}`;
    server.listen(port, HOSTNAME, () => {
      console.log(`🌍 running at ${serverAddress}/`);
    });
  }
};
