const utils = require('./utils');

exports.getTestArtefacts = async (event) => {
	let response;
	try {
		if (event.queryStringParameters && event.queryStringParameters.filepath) {
			let file = event.queryStringParameters.filepath;
			console.log('exports.getTestArtefacts -> file', file);

			const artefact = await utils.getTestArtefactFromS3(file);
			console.log('exports.getTestArtefacts -> artefact', artefact);

			response = {
				statusCode: 200,
				body: JSON.stringify(artefact)
			};
			console.log('exports.getTestArtefacts -> response', response);
		} else {
			response = {
				statusCode: 400,
				body: JSON.stringify({
					message: 'Failed to get test artefacts',
					error: 'Missing parameter: filepath'
				})
			};
		}
	} catch (error) {
		console.log('exports.getTestArtefacts -> error', error);
		response = {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Failed to get test artefacts',
				error: error
			})
		};
	}
	return response;
};

exports.uploadTestArtefacts = async (event) => {
	let response;
	try {
		let artefact = utils.getBodyFromEvent(event);
		console.log('exports.uploadTestArtefacts -> artefact', artefact);
		let parsedArtefact = JSON.parse(artefact);
		console.log('exports.uploadTestArtefacts -> parsedArtefact', parsedArtefact);
		let filename = parsedArtefact.filename;
		console.log('exports.uploadTestArtefacts -> filename', filename);
		let data = parsedArtefact.data;
		console.log('exports.uploadTestArtefacts -> data', data);

		await utils.postTestArtefactToS3(filename, data);

		response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Successfully uploaded test artefact',
				filename: filename,
				data: data
			})
		};
		console.log('exports.uploadTestArtefacts -> response', response);
	} catch (error) {
		console.log('exports.uploadTestArtefacts -> error', error);
		response = {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Failed to upload test artefacts',
				error: error
			})
		};
	}
	return response;
};
