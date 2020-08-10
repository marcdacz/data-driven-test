const fs = require('fs');
const utils = require('./utils');

const generateTestData = async (foldername) => {
	console.log('\nGenerating:', foldername);
	let files = fs.readdirSync(`./data/${foldername}`);

	for (const filename of files) {
		if (filename.endsWith('.js')) {
			console.log(filename);
			let filedata = require(`./data/${foldername}/${filename}`);

			utils.writeJson(filedata, `./data/${foldername}/json/${filename.replace('.js', '.json')}`);
			const response = await utils.uploadTestData(filedata, `${foldername}/${filename.replace('.js', '.json')}`);
			if (response.status != 200) console.log('generateTestData -> response', response);
		}
	}
};

const generateAllData = async () => {
	await generateTestData('customers');
	await generateTestData('products');
	await generateTestData('orders');
};

generateAllData();
