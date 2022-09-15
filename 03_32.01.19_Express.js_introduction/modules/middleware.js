// authentication & error middleware
const ExpressError = require(`./classExpressError`);

// Helpers
const validateQueryStringHelper = (queryStringObject) => {
    // if null, or bad number, then return `false` to raise 400.

    let queryIsNumerical = true;
    
    if(!queryStringObject.nums){
        // return false;    // some reason this doesn't work??
        queryIsNumerical = false;
    }
    
    const queryStringNums = queryStringObject.nums.split(',');

    // apparently `Set` also has the `forEach()` method:
    const queryStringSet = new Set(queryStringNums);

    let numericalQueryStringSet = [];
    queryStringSet.forEach((element) => {

        numericalQueryStringSet.push(Number(element));
        // console.log(Number(element));   // non-numerical elements become `NaN`

    });

    for(let element of numericalQueryStringSet){
        
        if(!element && element != 0){
            queryIsNumerical = false;
            break;  // can't break out of a .forEach()
        }

    }

    if(queryIsNumerical)
        return queryStringNums;

    return queryIsNumerical;
        // query string is all numbers; this only returns false b/c otherwise it returns earlier

}

const validateQueryString = (req, res, nxt) => {

    const queryStringIsValid = validateQueryStringHelper(req.query);

    if (!queryStringIsValid){

        console.log('fa')
        
        const error400 = new ExpressError(400, 'Bad Request'); //to finish
        return nxt(error400);

    }

    // pass values within middleware? res.locals (https://stackoverflow.com/a/38355597)
    // res.locals.numsArray = [...Number(queryStringIsValid)];
    res.locals.numsArray = queryStringIsValid.map((element) => Number(element));
    // console.log(res.locals.numsArray);
    return nxt();

}

module.exports = {
    validateQueryStringHelper,
    validateQueryString
}