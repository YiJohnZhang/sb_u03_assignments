//  Framework(s) & Librar(ies)
//  ==========================
const express = require('express');
const router = new express.Router();

//  Module(s)
//  =========
const db = require('../database/db');
const {Companies, Invoices} = require('../models');
const ExpressError = require('./classExpressError');
const {requestInvoicesResourceExists} = require('./middlewareValidation');

//  Environment Variable(s) & Constant(s)
//  =====================================
const {RESPONSE_MESSAGE_MAPPING} = require('./CONSTANTS')

// Base URL = `/invoices`

router.get('/', async(req, res, nxt) => {

    try{

        const result = await Invoices.returnAllModels();
        /*  Test
         *  const resultObject = await Invoices.returnAllModelsObject();
         *  const stringRpr = resultObject.map((element) => element.__repr__());
         *  console.log(stringRpr);
         */
        return res.json({invoices: result})

    }catch(error){
        nxt(error);
    }

});

router.get('/:id', requestInvoicesResourceExists, async(req, res, nxt) => {

    try{
        
        const result = await Invoices.returnModelByPK(req.params.id);

        const companyResult = await Companies.returnModelByPK(result.comp_code);
        result.company = companyResult;

        return res.json({invoice:result});

    }catch(error){
        nxt(error);
    }

});

router.post('/', async(req, res, nxt) => {

    try{
        
        const result = await db.query(`
            INSERT INTO invoices (comp_code, amt)
            VALUES($1, $2)
            RETURNING *
        `, [req.body.comp_code, req.body.amt]);

        return res.status(201).json({invoice: result.rows[0]});

    }catch(error){
        nxt(error);
    }

});

router.put('/:id', requestInvoicesResourceExists, async(req, res, nxt) => {
    
    try{

        // custom logic
        const result = await db.query(`
            UPDATE invoices
            SET amt = $1
            WHERE id = $2
            RETURNING *
        `, [req.body.amt, req.params.id]);
        
        return res.json({invoice: result.rows[0]})

    }catch(error){
        nxt(error);
    }

});

router.delete('/:id', requestInvoicesResourceExists, async(req, res, nxt) => {

    try{

        const result = await Invoices.deleteModelByPK(req.params.id);

        return res.json(result)

    }catch(error){
        nxt(error);
    }

});


module.exports = router;