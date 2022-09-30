/** BizTime express application. */
const express = require("express");
const morgan = require('morgan');

const app = express();

//  Settings & Before Middleware
//  ============================
app.use(morgan('dev'), express.json());

//  Module(s)
//  =========
const companiesRouter = require('./modules/routerCompanies');
const invoicesRouter = require('./modules/routerInvoices');
const industriesRouter = require('./modules/routerIndustries');
const ExpressError = require("./modules/classExpressError");
const db = require('./database/db');

//  Environment Variable(s) & Constant(s)
//  =====================================
const {RESPONSE_MESSAGE_MAPPING} = require('./modules/CONSTANTS');

app.use('/companies', companiesRouter);
app.use('/invoices', invoicesRouter);
app.use('/industries', industriesRouter);

/** 404 handler */
app.use(function(req, res, next) {
    const err = new ExpressError(404);
    return next(err);
});

/** general error handler */
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error:{
            status:err.status,
            message: err.message
        }
    });
});

module.exports = app;