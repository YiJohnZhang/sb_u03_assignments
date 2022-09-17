const express = require('express');
const router = new express.Router();

const fakeDB = require('./fakedb');
    // data

const findItem = (itemName) => {

    return fakeDB.find((element) => element.name.toLowerCase() == itemName);

};

const findIndex = (itemName) => {

    return fakeDB.find((element, index) => {
        if (element.name.toLowerCase() == itemName){
            return index;
        }
    });

};

const filterItem = (itemName) => {

    return fakeDB.filter((element) => element.name.toLowerCase() != itemName);

}


router.get('/', (req, res) => {

    return res.send(fakeDB);

});

router.post('/', (req, res) => {

    const requestBody = req.params.body;
    console.log(requestBody);

    return res.json({'added':requestBody})

});

router.get('/:itemName', (req, res) => {

    const selectedItem = findItem(req.params.itemName);

    if (selectedItem == undefined)
        return res.status(404).send('404');
        // no errors for this application, not in spec.
        // lmao just do a middleware checker ._.

    return res.json(selectedItem);

});

router.patch('/:itemName', (req, res) => {

    const selectedItem = findItem(req.params.itemName);
    
    if (selectedItem == undefined)
        return res.status(404).send('404');
    
    const requestBody = req.params.body;
    console.log(requestBody);

    const itemIndex = findIndex(selectedItem.name);
    console.log(itemIndex);

    fakeItem[itemIndex].price = selectedItem.price;
        // double check if updating the name is also valid

    return res.json({'updated':fakeDB[itemIndex]});

});

router.delete('/:itemName', (req, res) => {

    const selectedItem = findItem(req.params.itemName);
    
    if (selectedItem == undefined)
        return res.status(404).send('404');

    fakeDB = filterItem(selectedItem.name);
    return res.status(201).json({message:'deleted'});

});


module.exports = router;