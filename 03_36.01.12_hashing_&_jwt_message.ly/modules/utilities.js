  /**	'utilities.js' consists of miscellaneous objects that are generally used by an application:
	*	- RESPONSE_MESSAGE_MAPPING: A map of error codes with pre-written general messages.
	*	- ExpressError: An extension of the JavaScript `Error` class that has `status` and `message` properties that error-listening `Express.js` middleware will catch.
	*/

const RESPONSE_MESSAGE_MAPPING = {
	// A map of error codes with pre-written general messages.

	400: {message: '400: bad request'},
	403: {message: '403: forbidden'}, 
	404: {message: '404: not found'},
	'404graceful': {message: 'Resource not found.'},
	409: {message: '409: conflict'},
	'409alreadyExists': {message: 'Resource already exists.'},
	'deleted': {message: 'deleted'},
};

class ExpressError extends Error {
	// An extension of the JavaScript `Error` class that has `status` and `message` properties that error-listening `Express.js` middleware will catch.

	constructor(status, message=undefined){

		super();

		if(message === undefined){
			this.status = Number(String(status).substring(0, 3));
			this.message = RESPONSE_MESSAGE_MAPPING[status].message;
		}else{
			this.status = status;
			this.message = message;
		}
		
		console.error(this.stack);
	
	}
}

module.exports = {
	RESPONSE_MESSAGE_MAPPING,
	ExpressError
};
