const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const path = require(`path`);
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);
const config = require(`../../config`);
const contentTypes = require(`../utils/contentTypes`);
const HOSTNAME = `127.0.0.1`;

const printDirectory = (targetPath, files) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Directory content</title>
</head>
<body>
<ul>
    ${files.map((it) => `<li><a href="${it}">${it}</a></li>`).join(``)}
</ul>
</body>
</html>`;
};

const readFile = async (targetPath, res) => {
  const data = await readfile(targetPath);
  const ext = path.extname(targetPath).substring(1);
  res.setHeader(`content-type`, contentTypes[ext]);
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};


const readDir = async (targetPath, res) => {
  const files = await readdir(targetPath);
  res.setHeader(`content-type`, `text/html`);
  const content = printDirectory(targetPath, files);
  res.setHeader(`content-length`, Buffer.byteLength(content));
  res.end(content);
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
      const pathStat = await stat(absolutePath);

      res.statusCode = 200;
      res.statusMessage = `OK`;

      if (pathStat.isDirectory()) {
        await readDir(absolutePath, res);
      } else {
        await readFile(absolutePath, res);
      }
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
