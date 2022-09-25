const RESPONSE_MESSAGE_MAPPING = {
    403: {message: '403: forbidden'}, 
    404: {message: '404: not found'},
    '404graceful': {message: 'Resource not found.'},
    409: {message: '409: conflict'},
    '409alreadyExists': {message: 'Resource already exists.'},
    'deleted': {message: 'deleted'},
    // ...etc. to not memorize the object; maybe just import it FROM APP
};

module.exports = {
    RESPONSE_MESSAGE_MAPPING
};