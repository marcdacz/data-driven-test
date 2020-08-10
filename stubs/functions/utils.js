const getBodyFromEvent = (body) => {
	return event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body;
};

module.exports = {
	getBodyFromEvent
};
