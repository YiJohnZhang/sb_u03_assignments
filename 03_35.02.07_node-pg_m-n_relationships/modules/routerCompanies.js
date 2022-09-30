//  Framework(s) & Librar(ies)
//  ==========================
const express = require('express');
const router = new express.Router();

//  Module(s)
//  =========
const db = require('../database/db');
const {Companies, Industries, JoinCompaniesIndustries} = require('../models');
const ExpressError = require('./classExpressError');
const {requestCompaniesResourceExists} = require('./middlewareValidation');

//  Environment Variable(s) & Constant(s)
//  =====================================
const {RESPONSE_MESSAGE_MAPPING} = require('./CONSTANTS')

// Base URL = `/companies`

router.get('/', async(req, res, nxt) => {

    try{

        const result = await Companies.returnAllModels();
        return res.json({companies: result});

    }catch(error){
        nxt(error);
    }

});

router.get('/:code', async(req, res, nxt) => {

    try{
        
        let result = await Companies.returnModelByPK(req.params.code);
        
        const invoiceResult = await db.query(`
            SELECT id
            FROM invoices
            WHERE comp_code = $1
        `, [req.params.code])

        const industriesResult = await JoinCompaniesIndustries.returnModelsByCompany(req.params.code);
        const industriesPromiseMapping = await Promise.all(
            industriesResult.map(async(rowElement) => await Industries.returnModelByPK(rowElement.industries_code))
            );

        const invoiceArrayList = invoiceResult.rows.map((rowElement) => rowElement.id);
        
        result.invoices = invoiceArrayList;
        result.industries = industriesPromiseMapping.map((element) => element.industry_field);
            // i need a better error-handling system, i.e. for the 'graceful404', maybe I return "error: {"status":..., "message":...}"?
            // ok. I am so done with this assignment.

        return res.json({company: result})

    }catch(error){
        nxt(error);
    }

});

router.post('/', async(req, res, nxt) => {

    try{

        const companyObject = {

            code: req.body.code,
            name: req.body.name,
            description: req.body.description

        }

        const newCompany = new Companies(kwargsObjectParameters = companyObject);
        const result = await newCompany.createDatabaseEntry(returnJSON = true);
        
        return res.status(201).json({company:result});

    }catch(error){
        nxt(error);
    }

});

router.put('/:code', requestCompaniesResourceExists,
    async(req, res, nxt) => {

    try{

        const newCompanyObject = new Companies(kwargsInitializeObject = req.body);
        const result = await newCompanyObject.updateDatabaseEntry(returnJSON = true);

        return res.json({company:result});

    }catch(error){
        nxt(error);
    }

});

router.delete('/:code', requestCompaniesResourceExists,
    async(req, res, nxt) => {

    try{

        const result = await Companies.deleteModelByPK(req.body.code);
        return res.json(result);

    }catch(error){
        nxt(error);
    }

});

module.exports = router;