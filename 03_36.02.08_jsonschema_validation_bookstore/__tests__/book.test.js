const dbClient = require('../db');
const Book = require('../models/book');

const testBook = {
	"isbn": '9999999999',
	"amazon_url": "https://www.amazon.com",
	"author": 'Test Author',
	"language": "test",
	"pages": 2051920,
	"publisher": "Test",
	"title": "Test",
	"year": 2022
}

const bookOne = {
	"isbn": "0691161518",
	"amazon_url": "http://a.co/eobPtX2",
	"author": "Matthew Lane",
	"language": "english",
	"pages": 264,
	"publisher": "Princeton University Press",
	"title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
	"year": 2017
}
	// Springboard Assignment Page

const bookTwo = {
	"isbn": '1097704593',
	"amazon_url": "https://www.amazon.com/013143506X",
	"author": 'Erhan Kudeki & David Munson',
	"language": "english",
	"pages": 528,
	"publisher": "Pearson",
	"title": "aasdf",
	"year": 2008
}
	// https://numbergenerator.org/random-10-digit-number-generator
	// https://www.amazon.com/013143506X

describe('test \`Book\` model', () => {

	beforeEach(async() => {

		// Clear tables
		await dbClient.query('DELETE FROM books');

		// Reset SERIAL primary key to start with 1
		// await db.query("ALTER SEQUENCE  RESTART WITH 1");
		await Book.create(bookOne);
		await Book.create(bookTwo);

	});

	test('creating a book: Book.create() (\`POST\` \'/\')', async () => {

		// model
		const result = await Book.create(testBook);
		expect(result).toEqual(testBook);

	});

	test('returning all books: Book.findAll() (\`GET\` \'/\')', async () => {

		// model
		const result = await Book.findAll();
		expect(result.length).toBe(2);
		expect(result).toContainEqual(bookOne);
		expect(result).toContainEqual(bookTwo);
		expect(String(result.constructor)).toContain('Array');

		//
		
	});

	test('returning one book: Book.findOne(); (\`GET\` \'/:isbn\')', async () => {

		// model
		const result = await Book.findOne(bookOne.isbn);
		expect(result).toEqual(bookOne);

		//

	});

	test('updating one book: Book.update(isbn, data); (\`PUT\` \'/:isbn\')', async () => {

		let modifiedDummyBookOne = testBook;
		modifiedDummyBookOne.isbn = bookOne.isbn;

		// model
		const result = await Book.update(bookOne.isbn, testBook);
		expect(result).toEqual(modifiedDummyBookOne);

		//

	});

	test('deleting one book: Book.remove(isbn); (\`DELETE\` \'/:isbn\')', async () => {

		// model
		const result = await Book.remove(bookOne.isbn);
		expect(result).toEqual(undefined);

		//


	});

	test('\`ERROR:\`returning one book: Book.findOne(isbn); (\`GET\` \'/:isbn\')', async () => {

		// model
		try{
			const result = await Book.findOne("999");
			console.log(result);

		}catch(error){
			expect(error.message).toBe('There is no book with an isbn \'999\'.');
		}

		//

	});

	test('\`ERROR:\`updating one book: Book.update(isbn, data); (\`PUT\` \'/:isbn\')', async () => {

		// model
		try{
			const result = await Book.update("70", bookTwo);
			console.log(result);

		}catch(error){
			expect(error.message).toBe('There is no book with an isbn \'70\'.');
		}
		
		//

	});

	test('\`ERROR:\`deleting one book: Book.remove(isbn); (\`DELETE\` \'/:isbn\')', async () => {

		// model
		try{
			const result = await Book.update("70", bookTwo);
			console.log(result);

		}catch(error){
			expect(error.message).toBe('There is no book with an isbn \'70\'.');
		}

		//

	});

});

afterAll(async function() {
	await dbClient.end();
});