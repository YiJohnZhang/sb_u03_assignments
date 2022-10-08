const jsonschema = require('jsonschema');
const bookSchema = require('./models/book.schema.json');
const ExpressError = require('./expressError');


const validateBookMiddleware = (req, res, nxt) => {

    const schemaValidationResult = jsonschema.validate(req.body, bookSchema);

    if(!schemaValidationResult.valid){

        const schemaErrorList = schemaValidationResult.errors.map((error) => error.stack);
        const schemaError = new ExpressError(schemaErrorList, 400);
        return nxt(schemaError);
    }

    nxt();

}

module.exports = {validateBookMiddleware}