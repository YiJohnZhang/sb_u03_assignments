//  Module(s)
//  =========
const db = require('../database/db');
const {Companies, Invoices} = require('../models');
const ExpressError = require('./classExpressError');

//  Environment Variable(s) & Constant(s)
//  =====================================
const {RESPONSE_MESSAGE_MAPPING} = require('./CONSTANTS')

const requestCompaniesResourceExists = async(req, res, nxt) => {

    const objectExists = await Companies.confirmModelByPK(req.params.code);
        // figure out how to generalize `req.params.companyCode`

    if(objectExists)
        nxt();
    else
        nxt(new ExpressError(404));

}

const requestInvoicesResourceExists = async(req, res, nxt) => {

    const objectExists = await Invoices.confirmModelByPK(req.params.id);

    if(objectExists)
        nxt();
    else
        nxt(new ExpressError(404));

}

module.exports = {
    requestCompaniesResourceExists,
    requestInvoicesResourceExists
};