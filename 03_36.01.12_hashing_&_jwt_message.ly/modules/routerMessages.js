const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.get('/:id', async (req, res, nxt) => {
    /* GET /:id - get detail of message.
     *
     * => {message: {id,
     *               body,
     *               sent_at,
     *               read_at,
     *               from_user: {username, first_name, last_name, phone},
     *               to_user: {username, first_name, last_name, phone}}
     *
     * Make sure that the currently-logged-in users is either the to or from user.
     *
     */

    try{

        const result = await Message.get(req.params.id);
        return res.json({message:result});
    
    }catch(error){
        nxt(error);
    }    

});

router.post('/', async (req, res, nxt) => {
    /* POST / - post message.
     *
     * {to_username, body} =>
     *   {message: {id, from_username, to_username, body, sent_at}}
     *
     */

    try{

        const result = await Message.create(req.body);
        return res.json({message:result});

    }catch(error){
        nxt(error);
    }    

});

router.post('/:id/read', async (req, res, nxt) => {
    /* POST/:id/read - mark message as read:
     *
     *  => {message: {id, read_at}}
     *
     * Make sure that the only the intended recipient can mark as read.
     *
     */

    try{

        const result = await Message.markRead(req.params.id);
        return res.json({message:result});

    }catch(error){
        nxt(error);
    }    

});

 module.exports = router;
