//  Framework(s) & Librar(ies)
//  ==========================
const express = require('express');
    //oh, this used to be 'expresss'
const router = new express.Router();

//  Module(s)
//  =========
const {Companies, Industries, JoinCompaniesIndustries} = require('../models');
const {} = require('./middlewareValidation');

// Base URL = `/industries`

router.get('/', async(req, res, nxt) => {

    try{

        const results = await Industries.returnAllModels();

        return res.json({industries: results});

    }catch(error){

    }

});

router.post('/', async(req, res, nxt) => {
    // Submit a new industry.

    try{

        const newIndustry = new Industries(kwargsObjectParameters = req.body);
        const results = await newIndustry.createDatabaseEntry(returnJSON = true);

        return res.status(201).json({industries: results});

    }catch(error){
        nxt(error);
    }

});

router.get('/newjoin', async(req, res, nxt) => {

    try{

        const results = await JoinCompaniesIndustries.returnAllModels();
        
        return res.json({join: results});

    }catch(error){
        nxt(error);
    }

})

router.post('/newjoin', async(req, res, nxt) => {
    // Submit a new industry.

    try{

        const newIndustryObject = req.body;
        const newIndustry = new JoinCompaniesIndustries(kwargObjectParameters = newIndustryObject);
        const results = await newIndustry.createDatabaseEntry(returnJSON = true);

        return res.status(201).json({join: results});


    }catch(error){
        nxt(error);
    }

});

module.exports = router;