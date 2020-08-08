const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucketName = 'data-driven-test-artefacts';

exports.getTestArtefacts = async (event) => {
	let response;
	try {
		if (event.queryStringParameters && event.queryStringParameters.filepath) {
			let file = event.queryStringParameters.filepath;
			let params = {
				Bucket: bucketName,
				Key: file
			};
			console.log('exports.getTestArtefacts -> params', params);

			const artefact = await s3.getObject(params).promise();

			response = {
				statusCode: 200,
				body: JSON.stringify(artefact.Body.toString('utf-8'))
			};
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
