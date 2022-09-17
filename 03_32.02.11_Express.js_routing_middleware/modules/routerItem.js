const express = require('express');
const router = new express.Router();

const fakeDB = require('./fakedb');
    // data

const findItem = (itemName) => {

    return fakeDB.find((element) => element.name == itemName);

};

router.get('/', (req, res) => {

    return res.json();

});

router.post('/', (req, res) => {


    return res.json({'added':'temp'})

});

router.get('/:itemName', (req, res) => {

    const requestParameters = req.params;
    return res.json();

});

router.patch('/:itemName', (req, res) => {


    return res.json({'updated':'temp'});

});

router.delete('/:itemName', (req, res) => {


    return res.status(201).json({message:'deleted'});

});


module.exports = router;