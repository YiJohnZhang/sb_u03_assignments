const express = require('express');
const router = express.Router();

const User = require('../models/user');


const loginHelper = (username) => {

    // update last login and create jwt

}

// note the below is the doc string convention
/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async(req, res, nxt) => {

    try{

        const username = req.body.username;
        const result = await User.returnAllModels();

        if(username){
            loginHelper(username);
            return res.json({users:result});
        }else{
            // don't login
        }
    
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
        
        const username = req.body.username;

        const result = await User.returnAllModels();

        loginHelper(username);
        return res.json({users:result});

    }catch(error){
        nxt(error);
    }    

});

module.exports = router;