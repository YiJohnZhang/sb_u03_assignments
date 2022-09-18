process.env.NODE_ENV = 'TEST';
const supertest = require('supertest');

const app = require('./app');
let fakeDB = require('./modules/fakedb');

beforeAll(() => {

});

beforeEach(() => {


});

afterAll(() => {


});
 
afterEach(() => {

});

describe('GET & POST to `/items` ', () => {

    const TEST_PATH = '/items';

    afterAll(() => {

        fakeDB.pop();
            // reset fakeDB

    });

    test(`GET \`${TEST_PATH}\``, async() => {

        const response = await supertest(app)
            .get(TEST_PATH);

        // console.log(response.body.length);
            // I am getting 'ReferenceError: toBe is not defined'
        
        expect(response.statusCode).toBe(200);
            // I am getting 'ReferenceError: toBe is not defined' because it was `,toBe` instead of `.toBe` typo
        expect(response.body.length).toBe(2);

    });

    test (`POST \`${TEST_PATH}\``, async() => {

        const NEW_OBJECT = {'name':'asdf', 'price':4.29}

        const response = await supertest(app)
            .post(TEST_PATH)
            .send(NEW_OBJECT);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({'added':NEW_OBJECT});
        expect(fakeDB.length).toBe(3);

    });

});


describe(`test '\`/items/:itemName\` for 'itemName'='popsiCles'`, () => {

    const ITEM_NAME = 'popsiCles';
    const TEST_PATH = `/items/${ITEM_NAME}`;

    test(`GET \`${TEST_PATH}\``, async() =>{

        const response = await supertest(app)
            .get(TEST_PATH);

        expect(response.statusCode).toBe(404);

    });

    test(`PATCH \`${TEST_PATH}\``, async() =>{

        const response = await supertest(app)
            .patch(TEST_PATH);

        expect(response.statusCode).toBe(404);

    });

    test(`DELETE \`${TEST_PATH}\``, async() =>{

        const response = await supertest(app)
            .delete(TEST_PATH);

        expect(response.statusCode).toBe(404);

    });

});

describe(`test '\`/items/:itemName\` for 'itemName'='popsicle'`, () => {

    const ITEM_NAME = 'popsicle';
    const TEST_PATH = `/items/${ITEM_NAME}`;

    const POPSICLE_ITEM = fakeDB[0];
    const NEW_POPSICLE_ITEM = {'name':'popsiclE', 'price':5.60};

    test(`GET \`${TEST_PATH}\``, async() =>{

        const response = await supertest(app)
            .get(TEST_PATH);

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(POPSICLE_ITEM);

    });

    test(`PATCH \`${TEST_PATH}\``, async() =>{

        const response = await supertest(app)
            .patch(TEST_PATH)
            .send(NEW_POPSICLE_ITEM);

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({'updated':NEW_POPSICLE_ITEM});
        expect(fakeDB).toStrictEqual(
            [
                NEW_POPSICLE_ITEM,
                {
                    'name':'cheerios',
                    'price':3.40
                }
            ]
        );

    });

    test(`DELETE \`${TEST_PATH}\``, async() =>{

        const response = await supertest(app)
            .delete(TEST_PATH);

        expect(response.statusCode).toBe(200);
            // apparently a status code of 204 doesn't allow a custom message ._.
        console.log(fakeDB)
        expect(fakeDB.length).toBe(1);
        expect(response.body).toStrictEqual({'message':'Deleted'});
        // console.log(response);
            // for some reason response.body is undefined for a status code of 204.

    });
    
});
