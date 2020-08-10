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
	const artefact = await s3.getObject(params).promise();
	return JSON.parse(artefact.Body.toString('utf-8'));
};

module.exports = {
	getBodyFromEvent,
	getTestArtefactFromS3
};
