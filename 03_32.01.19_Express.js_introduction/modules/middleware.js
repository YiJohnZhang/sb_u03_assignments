// authentication & error middleware
const ExpressError = require(`./classExpressError`);
//const query = require("express/lib/middleware/query");



// Helpers
const validateQueryStringHelper = (queryStringObject) => {
    // if null, or bad number, then return `false` to raise 400.

    const queryStringNums = queryStringObject.nums.split(',');

    console.log(queryStringObject.nums)
    if(queryStringNums === null){
        return false;
    }

    // const inputSetArray = [... new Set()];
    // apparently `Set` also has the `forEach()` method:
    const queryStringSet = new Set(queryStringNums);
    let queryStringNonNumberElementIndex = null;   // literally `undefined` for good measure

    

    queryStringSet.map((element) => {

        try{
            numberedElement 
        }
        console.log(typeof element)
        if (typeof element != 'number'){
            console.log(element)
            return false;   // break from loop?
        }

    });

    /*
    if(queryStringNonNumberElementIndex === null){
        return false;
    }
    */

    return true;
        // query string is all numbers

}

const validateQueryString = (req, res, nxt) => {

    const queryStringIsValid = validateQueryStringHelper(req.query);
    if (!queryStringIsValid){

        const error400 = new ExpressError(400, 'Bad Request'); //to finish
        return nxt(error400);

    }


    // need to be able to pass values
    return nxt();

}

module.exports = {
    validateQueryStringHelper,
    validateQueryString
}