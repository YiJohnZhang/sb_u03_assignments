const express = require('express');
const router = new express.Router();

//  Module(s)
//  =========
const db = require('../database/db');
const {Companies} = require('../models');

//  Environment Variable(s) & Constant(s)
//  =====================================
const {RESPONSE_MESSAGE_MAPPING} = require('./CONSTANTS')

// Base URL = `/companies`

router.get('/', async(req, res, nxt) => {

    try{

        // const result = await Companies.returnAllModels();
        
        return res.json({companies: result.rows});

    }catch(error){
        nxt(error);
    }

});

router.get('/:companyCode', async(req, res, nxt) => {

    try{



    }catch(error){
        
    }

});

module.exports = router;