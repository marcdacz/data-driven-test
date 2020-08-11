const utils = require('./utils');

export const getProduct = async (event, context) => {
	let response;
	try {
		let ids = event.multiValueQueryStringParameters.ids;
		let productList = [];

		for (const id of ids) {
			productList.push(await utils.getTestArtefactFromS3(`products/${id}.json`));
		}

		response = {
			statusCode: 200,
			body: JSON.stringify(productList)
		};
	} catch (error) {
		response = {
			statusCode: 404,
			body: JSON.stringify({
				status: 404,
				error: 'Missing products'
			})
		};
	}

	return response;
};
