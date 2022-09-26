/** Database setup for BizTime. */
const {Client} = require('pg');

const DB_URI = process.env.NODE_ENV === 'TEST' ? 'postgresql:///sb_35_01_11_test' : 'postgresql:///sb_35_01_11';
// postgres://[postgresUsername][:postgresPassword][@localhost][:postgresPortNumber, usually 5432]/databaseName

const db = new Client(DB_URI);
db.connect();

// const result = db.query('SELECT * FROM companies', (err, res) => {
//     console.log(err, res.rows);
// });

module.exports = db;