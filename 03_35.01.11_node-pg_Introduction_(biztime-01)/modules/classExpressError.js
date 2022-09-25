/** ExpressError extends the normal JS error so we can easily
 *  add a status when we make an instance of it.
 *
 *  The error-handling middleware will return this.
 */
const {RESPONSE_MESSAGE_MAPPING} = require('./CONSTANTS')

class ExpressError extends Error {
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

module.exports = ExpressError;