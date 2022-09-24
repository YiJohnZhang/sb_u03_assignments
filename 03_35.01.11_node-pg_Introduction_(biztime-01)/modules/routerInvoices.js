const express = require('express');
const router = new express.Router();

//  Module(s)
//  =========
const db = require('../database/db');
const models = require('../models');

//  Environment Variable(s) & Constant(s)
//  =====================================
const {RESPONSE_MESSAGE_MAPPING} = require('./CONSTANTS')

// Base URL = `/invoices`

router.get('/', async(req, res, nxt) => {

    try{

    }catch(error){
        
    }

});

module.exports = router;