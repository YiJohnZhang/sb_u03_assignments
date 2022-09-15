//  Frameworks & Librar(ies)
//  ========================
const express = require('express');
const morgan = require('morgan');


//  Module(s)
//  =========
const helperFunctions = require('./modules/helpers');
const middleware = require('./modules/middleware')
const ExpressError = require(`./modules/classExpressError`);

//  Setting(s)
//  ==========
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

//  Environment Variable(s) & Constant(s)
//  ====================================
const PORT_NUMBER = 3000;

//  Routing
//  =======
app.get('/mean', middleware.validateQueryString, (request, response) => {

    mean = helperFunctions.mean(response.locals.numsArray);
    console.log(mean)
    response.json({
        operation: 'mean',
        mean
    });

});

app.get('/median', middleware.validateQueryString, (request, response) => {

    median = helperFunctions.median(response.locals.numsArray);
    response.json({
        operation: 'median',
        median
    });

});

app.get('/mode', middleware.validateQueryString, (request, response) => {

    mode = helperFunctions.mode(response.locals.numsArray);

    response.json({
        operation: 'mode',
        mode,
    });

});

app.get('/all', middleware.validateQueryString, (request, response) => {

    mean = helperFunctions.mean();
    median = helperFunctions.median();
    mode = helperFunctions.mode();

    response.json({
        operation: 'all',
        mean,
        median,
        mode,
    });

});

app.use((req, res, nxt) => {

    const error404 = new ExpressError(404, 'Not Found');
    return nxt(error404);

})

app.use((err, req, res, nxt) => {

    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: {status, message}
    });

});

app.listen(PORT_NUMBER);