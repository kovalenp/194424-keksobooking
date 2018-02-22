const path = require(`path`);

const CONTENT_TYPE_MAP = {
  css: `text/css`,
  html: `text/html; charset=UTF-8`,
  jpg: `image/jpeg`,
  png: `image/png`,
  ico: `image/x-icon`,
  gif: `image/gif`,
};

const resolve = (targetPath) => {
  const ext = path.extname(targetPath).substring(1);
  if (Object.keys(CONTENT_TYPE_MAP).includes(ext)) {
    return CONTENT_TYPE_MAP[ext];
  }
  return `text/plain`;

};

module.exports = {
  resolve
};
