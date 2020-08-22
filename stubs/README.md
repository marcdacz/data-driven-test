# Stubs

This is the second part of the Data-drive Test Playbook: Serverless Stubs

## Folder Structure

This is a serverless framework project where the api endpoints are in defined in the _serverless.yml_ file and their handlers are inside the functions folder. We also got here a _utils.js_ that contains helper methods that allows us to retrieve and post data to and from an S3 Bucket.

```
│   serverless.yml
│   webpack.config.js
│
└───functions
        artefacts.js
        customers.js
        orders.js
        products.js
        utils.js
```

## Code Anatomy

In this implementation of the stubs, we retrieve the expected data from an AWS S3 Bucket.

```
const utils = require('./utils');

export const getCustomer = async (event, context) => {
	let response;
	try {
		let id = event.pathParameters.id;
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
```

We have also exposed the posting and getting of test artefacts to and from s3 bucket. This allows devs and testers to add or customise the test data as they develop or during run time. Another benefit is that you can retrieve some test data from prod or other non-prod environments and add them as a test data so you can reproduce reported issues.

```
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
```

## Set up, Execution and Deployment

```
npm install

//offline mode to allow you to debug locally
npm start

//deploys the stub
npm deploy
```

## References

-   [GorillaStack Optimising Lambda Cold Starts](https://www.gorillastack.com/news/optimizing-your-lambda-cold-starts-with-serverless-webpack/)
