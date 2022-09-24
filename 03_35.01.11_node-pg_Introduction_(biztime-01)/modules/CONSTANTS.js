const RESPONSE_MESSAGE_MAPPING = {
    403: {message: '403: unauthorized'}, 
    404: {message: '404: not found'},
    'graceful404': {message: 'Result not found.'},
    'deleted': {message: 'Deleted'},
    // ...etc. to not memorize the object; maybe just import it FROM APP
};

module.exports = {
    RESPONSE_MESSAGE_MAPPING
};