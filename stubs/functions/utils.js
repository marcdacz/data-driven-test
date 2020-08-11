const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucketName = 'data-driven-test-artefacts';

const getBodyFromEvent = (event) => {
	return event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body;
};

const getTestArtefactFromS3 = async (filename) => {
	let params = {
		Bucket: bucketName,
		Key: filename
	};
	console.log('params', params);
	const artefact = await s3.getObject(params).promise();
	return JSON.parse(artefact.Body.toString('utf-8'));
};

const postTestArtefactToS3 = async (filename, data) => {
	try {
		let params = {
			Bucket: bucketName,
			Key: filename,
			Body: JSON.stringify(data)
		};
		console.log('params', params);
		await s3.putObject(params).promise();
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getBodyFromEvent,
	getTestArtefactFromS3,
	postTestArtefactToS3
};
