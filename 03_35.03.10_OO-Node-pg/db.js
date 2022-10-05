/** Database for lunchly */

const pg = require("pg");

const db = new pg.Client("postgresql:///sb_35_03_10_lunchly");

db.connect();

module.exports = db;
