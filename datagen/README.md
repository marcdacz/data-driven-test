# DataGen

This is the first part of the Data-driven Test Playbook: Test Data Generation

## Folder Structure

Each data folder represents the endpoints we would like to generate test data for. Every folder contains a sample test data named base.json. For each test data you want to generate, we create a js file that creates a copy of the base json and updates the necessary fields that we need for our application.

```
│   index.js
│   utils.js
│
└───data
    ├───customers
    │   │   base.json
    │   │   customer01.js
    │   │
    │   └───json
    │           customer01.json
    │
    ├───orders
    │   │   base.json
    │   │   order01.js
    │   │
    │   └───json
    │           order01.json
    │
    └───products
        │   base.json
        │   product01.js
        │   product02.js
        │
        └───json
                product01.json
                product02.json

```

## Code Anatomy

The main gist of the data generator code is that it reads the data folder and for each js file it will generate the test data then save and upload it to the stub server.

```
const generateTestData = async (foldername) => {
  let files = fs.readdirSync(`./data/${foldername}`);

  for (const filename of files) {
    if (filename.endsWith(".js")) {
      let filedata = require(`./data/${foldername}/${filename}`);

	  // Save test data
      utils.writeJson(
        filedata,
        `./data/${foldername}/json/${filename.replace(".js", ".json")}`
      );

	  // Upload test data to server
      await utils.uploadTestData(
        filedata,
      	`${foldername}/${filenam.replace(".js", ".json")}`
      );
    }
  }
};
```

## Set up and Execution

```
npm install

npm start
```
