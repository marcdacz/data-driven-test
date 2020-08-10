const fs = require('fs');

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

const superagent = require('superagent');
const uploadTestData = async (data, filename) => {
	let artefact = {
		filename: filename,
		data: data
	};
	return new Promise(async (resolve, reject) => {
		superagent.post(`http://localhost:3000/dev/utils/artefacts`).send(artefact).end((err, res) => {
			err ? resolve(err) : resolve(res);
		});
	});
};

module.exports = {
	writeJson,
	getBaseJson,
	copyObject,
	uploadTestData
};
