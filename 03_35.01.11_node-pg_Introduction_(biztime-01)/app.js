/** BizTime express application. */
const express = require("express");
const morgan = require('morgan');

const app = express();

//  Settings & Before Middleware
//  ============================
app.use(morgan('dev'));
app.use(express.json());

//  Module(s)
//  =========
const companiesRouter = require('./modules/routerCompanies');
const invoicesRouter = require('./modules/routerInvoices');
const ExpressError = require("./modules/classExpressError");
const db = require('./database/db');

//  Environment Variable(s) & Constant(s)
//  =====================================
const {RESPONSE_MESSAGE_MAPPING} = require('./modules/CONSTANTS')


/** 404 handler */
app.use(function(req, res, next) {
  const err = new ExpressError(404);
  return next(err);
});

/** general error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;