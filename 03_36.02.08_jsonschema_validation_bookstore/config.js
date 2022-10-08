/** Common config for bookstore. */

// const DB_URI = process.env.NODE_ENV === 'test'	? 'postgresql:///sb_36_02_08_bookstore_test' : 'postgresql:///sb_36_02_08_bookstore';
const DB_URI = 'postgresql:///sb_36_02_08_bookstore';

module.exports = { DB_URI };