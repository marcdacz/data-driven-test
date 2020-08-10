const utils = require('./utils');

export const getCustomer = async (event, context) => {
	let response;
	try {
		let id = event.pathParameters.customerId;
		response = {
			statusCode: 200,
			body: JSON.stringify(await utils.getTestArtefactFromS3(`customers/${id}.json`))
		};
	} catch (error) {
		response = {
			statusCode: 404,
			body: JSON.stringify({
				status: 404,
				error: 'Missing customer'
			})
		};
	}

	return response;
};
