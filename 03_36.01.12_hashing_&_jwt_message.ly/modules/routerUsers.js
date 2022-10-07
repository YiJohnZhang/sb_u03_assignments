const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res, nxt) => {
    /* GET / - get list of users.
     *
     * => {users: [{username, first_name, last_name, phone}, ...]}
     */

    try{

        const result = await User.all();
        return res.json({users:result});
    
    }catch(error){
        nxt(error);
    }

});

 router.get('/:username', async (req, res, nxt) => {
    /* GET /:username - get detail of users.
     *
     * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
     */

    try{

        const result = await User.get(req.params.username);
        return res.json({user:result});
    
    }catch(error){
        nxt(error);
    }

});

router.get('/:username/to', async (req, res, nxt) => {
    /* GET /:username/to - get messages sent to specified username
     *
     * => {messages: [{id,
     *                 body,
     *                 sent_at,
     *                 read_at,
     *                 from_user: {username, first_name, last_name, phone}}, ...]}
     */

    try{

        const result = await User.messagesTo(req.params.username);
        return res.json({messages:result});
    
    }catch(error){
        nxt(error);
    }

});

router.get('/:username/from', async (req, res, nxt) => {
    /* GET /:username/from - get messages from specified username
     *
     * => {messages: [{id,
     *                 body,
     *                 sent_at,
     *                 read_at,
     *                 to_user: {username, first_name, last_name, phone}}, ...]}
     */

    try{

        const result = await User.messagesFrom(req.params.username);
        return res.json({messages:result});
    
    }catch(error){
        nxt(error);
    }

});

module.exports = router;