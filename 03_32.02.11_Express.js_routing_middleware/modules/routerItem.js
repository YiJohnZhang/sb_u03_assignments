const express = require('express');
const router = new express.Router();

let fakeDB = require('./fakedb');
    // data

const findItemIndex = (itemName) => {

    return fakeDB.findIndex((element) => element.name.toLowerCase() == itemName);

};

const filterItemIndex = (itemIndex) => {

    return fakeDB.filter((element, index) => index != itemIndex);
        // guess that is the draw back of arrays. This is O(n), for deletion when the index is known.
        // thing is, if it were a hash it'd be more efficient: finding: O(1) rather than O(n); deleting: O(1)?
        // given the index, linked list: finding => O(n), deleting => O(n) because traversing even when index is known, however returning the memory address makes it O(1)
        // given the index, array: finding => O(n), deleting => O(n-1) ~ O(n) because re-allocating memory.

}

// hm... this is the drawback because dbSearchMiddleware will have to also import fakeDB complicating maintenance.
// I suspect this is the drawback of routers.
const itemSearchMiddleware = (req, res, nxt) => {

    const selectedItemIndex = findItemIndex(req.params.itemName);

    if (selectedItemIndex == -1)
        return res.status(404).send('404');
        // no errors for this application, not in spec.

    res.locals.selectedItemIndex = selectedItemIndex;
        // how to send selectedItemIndex to the next function
        // https://stackoverflow.com/a/38355597

    nxt();

}

router.get('/', (req, res) => {

    return res.send(fakeDB);

});

router.post('/', (req, res) => {

    const requestBody = req.body;

    fakeDB.push(req.body);

    return res.status(201).json({'added':req.body})

});

router.get('/:itemName', (req, res) => {

    const selectedItemIndex = findItemIndex(req.params.itemName);

    if (selectedItemIndex == -1)
        return res.status(404).send('404');
        // no errors for this application, not in spec.

    return res.json(fakeDB[selectedItemIndex]);

});

router.patch('/:itemName', (req, res) => {

    const selectedItemIndex = findItemIndex(req.params.itemName);
    
    if (selectedItemIndex == -1)
        return res.status(404).send('404');
    
    const requestBody = req.body;

    fakeDB[selectedItemIndex].name = requestBody.name;
    fakeDB[selectedItemIndex].price = requestBody.price;
        // refactor: find a more efficient way of doing this

    return res.json({'updated':fakeDB[selectedItemIndex]});

});

router.delete('/:itemName', (req, res) => {

    const selectedItemIndex = findItemIndex(req.params.itemName);
    
    if (selectedItemIndex == -1)
        return res.status(404).send('404');

    fakeDB = filterItemIndex(selectedItemIndex);
    console.log(fakeDB);
    return res.status(204).json({'message':'deleted'});

});

module.exports = router;