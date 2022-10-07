const express = require('express');
const router = express.Router();

const User = require('../models/user');

// note the below is the doc string convention
/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async(req, res, nxt) => {

    try{

        const result = await User.returnAllModels();
        return res.json({users:result});
    
    }catch(error){
        nxt(error);
    }    

});


router.post('/register', async(req, res, nxt) => {
    /** POST /register - register user: registers, logs in, and returns token.
     *
     * {username, password, first_name, last_name, phone} => {token}.
     *
     *  Make sure to update their last-login!
     */

    try{

        const result = await User.returnAllModels();
        return res.json({users:result});

    }catch(error){
        nxt(error);
    }    

});

module.exports = router;