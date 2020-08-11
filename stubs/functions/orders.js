const utils = require('./utils');

export const getOrder = async (event, context) => {
	let response;
	try {
		let id = event.queryStringParameters.id;
		response = {
			statusCode: 200,
			body: JSON.stringify(await utils.getTestArtefactFromS3(`orders/${id}.json`))
		};
	} catch (error) {
		response = {
			statusCode: 404,
			body: JSON.stringify({
				status: 404,
				error: 'Missing order'
			})
		};
	}

	return response;
};

export const postOrder = async (event, context) => {
	let response;
	try {
		let order = utils.getBodyFromEvent(event);
		console.log('postOrder -> order', order);
		let parsedOrder = JSON.parse(order);
		console.log('postOrder -> parsedOrder', parsedOrder);
		let filename = `orders/${parsedOrder.orderId}.json`;
		console.log('postOrder -> filename', filename);
		let data = parsedOrder.data;
		console.log('postOrder -> data', data);

		await utils.postTestArtefactToS3(filename, data);

		response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Order posted successfully'
			})
		};
		console.log('postOrder -> response', response);
	} catch (error) {
		console.log('postOrder -> error', error);
		response = {
			statusCode: 500,
			body: JSON.stringify({
				status: 500,
				error: 'Failed to post order'
			})
		};
	}
	return response;
};
