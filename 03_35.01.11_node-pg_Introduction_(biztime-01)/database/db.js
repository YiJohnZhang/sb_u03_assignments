/** Database setup for BizTime. */
const {Client} = require('pg');

const DB_URI = process.env.NODE_ENV === 'TEST' ? 'postgresql:///sb_35.01.11_biztime_TEST' : 'postgresql:///sb_35.01.11_biztime';

const db = new Client({
    connetionString: DB_URI
});

db.connect();

module.exports = db;