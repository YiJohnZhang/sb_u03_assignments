/** Database setup for BizTime. */
const {Client} = require('pg');

// const {DB_URI_PREFIX, SUDO_USERNAME, SUDO_PASSWORD, DB_HOST, DB_USER} = require('../secrets')
// const PORT_NUMBER = 32;
//     // later get this from `server.js`
// const DB_NAME = process.env.NODE_ENV === 'TEST' ? 'sb_35.01.11_biztime_TEST' : 'sb_35.01.11_biztime';
// const CONNECTION_STRING = `${DB_URI_PREFIX}${SUDO_USERNAME}:${SUDO_PASSWORD}@${DB_HOST}:${PORT_NUMBER}/${DB_NAME}`
//     // Ubuntu Overhead
//     // https://github.com/brianc/node-postgres/issues/1999

// console.log(CONNECTION_STRING);

const DB_URI = process.env.NODE_ENV === 'TEST' ? 'postgresql:///sb_35_01_11_biztime_TEST' : 'postgresql:///sb_35_01_11_biztime';

const db = new Client({
    connetionString: DB_URI
});

db.connect();

console.log(DB_URI);
// db.query('SELECT * FROM "cclearompanies"', (err, res) => {
//     console.log(err, res);
// });

db.query('SELECT * FROM companies', (err, res) => {
    console.log(err, res);
});

//42P01 Error, Correct Database, public schema table

db.query('SELECT * FROM invoices', (err, res) => {
    console.log(err, res);
});

module.exports = db;