const db = require(`../db/database`);
const mongodb = require(`mongodb`);

let bucket;

const getBucket = async () => {
  if (bucket) {
    return bucket;
  }
  const dBase = await db();
  if (!bucket) {
    bucket = new mongodb.GridFSBucket(dBase, {
      chunkSizeBytes: 1024 * 1024,
      bucketName: `avatars`
    });
  }
  return bucket;
};

const get = async (filename) => {
  bucket = await getBucket();
  const results = await bucket.find({filename}).toArray();
  const entity = results[0];
  if (!entity) {
    return void 0;
  }
  return {info: entity, stream: bucket.openDownloadStreamByName(filename)};
};

const save = async (filename, stream) => {
  bucket = await getBucket();
  return new Promise((success, fail) => {
    stream.pipe(bucket.openUploadStream(filename)).on(`error`, fail).on(`finish`, success);
  });
};

module.exports = {
  save,
  get
};

