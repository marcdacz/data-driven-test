const fs = require("fs");
const utils = require("./utils");

const generateTestData = async (foldername) => {
  let files = fs.readdirSync(`./data/${foldername}`);

  for (const filename of files) {
    if (filename.endsWith(".js")) {
      let filedata = require(`./data/${foldername}/${filename}`);

      utils.writeJson(
        filedata,
        `./data/${foldername}/json/${filename.replace(".js", ".json")}`
      );
      // await utils.uploadTestData(
      //   filedata,
      //   `${foldername}/${filenam.replace(".js", ".json")}`
      // );
    }
  }
};

const generateAllData = async () => {
  // await generateTestData("customer");
  await generateTestData("product");
};

generateAllData();
