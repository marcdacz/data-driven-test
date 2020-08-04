const fs = require("fs");

const writeJson = (data, filename) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

const getBaseJson = (filename) => {
  delete require.cache(require.resolve(filename));
  return require(filename);
};

const copyObject = (dataObj) => {
  return JSON.parse(JSON.stringify(dataObj));
};

const superagent = require("superagent");
const postArtefactsUrl = "https://post-artefacts-url.com";
const uploadTestData = async (data, filename) => {
  return new Promise(async (resolve, reject) => {
    superagent
      .post(`${postArtefactsUrl}/artefacts`)
      .send({
        filename: filename,
        data: data,
      })
      .end((err, res) => {
        err ? resolve(err) : resolve(res);
      });
  });
};

module.exports = {
  writeJson,
  getBaseJson,
  copyObject,
  uploadTestData,
};
