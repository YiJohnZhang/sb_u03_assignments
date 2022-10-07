const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../config');
const User = require('../models/user');
const { ExpressError } = require('./utilities');


const loginHelper = (username) => {

    // update last login and create jwt
    User.updateLoginTimestamp(username);
    let token = jwt.sign({username}, JWT_SECRET_KEY);

    return token;

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

        const result = await User.authenticate(username, req.body.password);

        if(result === true){
            let token = loginHelper(username);
            return res.json({token});
        }else{
            throw new ExpressError(400, 'Wrong password.')
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

        // const {username, password, first_name, last_name, phone} = req.body;

        const result = await User.register(req.body);
        let token = loginHelper(result.username);
        
        return res.json({token});

    }catch(error){
        nxt(error);
    }    

});

module.exports = router;