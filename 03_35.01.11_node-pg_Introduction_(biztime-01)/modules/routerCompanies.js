//  Framework(s) & Librar(ies)
//  ==========================
const express = require('express');
const router = new express.Router();

//  Module(s)
//  =========
const {Companies} = require('../models');
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
        
        const result = await Companies.returnModelByPK(req.params.companyCode);
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
            // figure out a way to automate destructuring

        const newCompany = new Companies(kwargsInitializeObject = companyObject);

        const result = await newCompany.createDatabaseEntry(returnJSON = true);
        return res.status(201).json({company:result});

    }catch(error){
        nxt(error);
    }

});

router.put('/:code', requestCompaniesResourceExists,
    async(req, res, nxt) => {

    try{

        const newCompanyObject = new Companies(kwargsInitializeObject = req.body)
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