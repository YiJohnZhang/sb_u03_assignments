const db = require('./database/db');
const ExpressError = require('./modules/classExpressError');

// Constants
const {RESPONSE_MESSAGE_MAPPING} = require('./modules/CONSTANTS')


class Companies {

    static relationName = 'companies';
        // name of the table

    constructor(code = undefined, name = null, description = null, kwargsInitializeObject = undefined){
        
        if((typeof code === 'null' || 'undefined') || code === ''){
            throw new Error('Company \'code\' cannot be empty or null.');
        }else{
            this.code = code;
        }

        if((typeof name === 'null' || 'undefined') || name === ''){
            throw new Error('Company \'name\' cannot be empty or null.');
        }else{
            this.name = name;
        }

        this.description = description;
        // ...

        if(kwargsInitializeObject)
            Object.assign(this, kwargsInitializeObject);

    }

    // static methods
    static splatCreateUpdateQuery(modelInstance, operation){

        const {code, ...mutableModelProperties} = modelInstance;

        let queryString;
        const objectKeys = Object.keys(mutableModelProperties);
        const objectValues = Object.values(mutableModelProperties);
        
        if(operation = 'create'){
            
            const keyArguments = objectKeys.join(',');
            const queryArguments = objectKeys.map((objectKey, index) => `$${index+1}`);
            const queryParameterization = queryArguments.join(',');

            queryString = `INSERT INTO ${Companies.relationName} (${keyArguments})
                VALUES (${queryParameterization}) RETURNING *`;

        }else if(operation = 'update'){

            const queryArguments = objectKeys.map((objectKey, index) => `${objectKey} = $${index+1}`);
            const queryParameterization = queryArguments.join(',');

            queryString = `UPDATE ${Companies.tableName} SET ${queryParameterization}
                WHERE code = ${code}
                RETURNING *`;
                // RETURNING pk only because it may return columns with sensitive data
                // const queryArgumentLength = queryArguments.length;
        }
        return db.query(queryString, objectValues);

    }

    static async gracefulModel404(testObject){
        // Handle no results matched without raising 404.
        if (testObject === false || testObject === undefined || testObject === null)
            return false;
            // modify this to be graceful404 object

        return testObject;
    }

    static async confirmModelByPK(primaryKey){
        // Only confirm whether or not the primary key exists in the database to prevent returning sensitive information. Intended for middleware to validate existence.
        const result = await db.query(
            `SELECT code
            FROM companies
            WHERE code = $1`,
            [primaryKey]);
        
        if(result.row[0] === undefined);
            throw new ExpressError(404, 'Result not found.');

    }

    static async returnModelyPK(primaryKey){
        // Returns a model by PK in the database, general.
        
        const result = await db.query(
            `SELECT *
            FROM companies
            WHERE code = $1`,
            [primaryKey]);
        
        const modelInstance = result.row[0];

        return modelInstance;

    }

    static async returnModelJSONByPK(primaryKey) {
        // Returns a model by PK in the database, usually used with intention for returning `.json`.
        
        let modelInstance = await returnModelyPK(primaryKey);

        modelInstance = gracefulModel404(modelInstance);

        return modelInstance;
    }

    static async returnModelObjectByPK(primaryKey) {
        // Returns a model by PK in the database, developed with intention for updating.
        
        let modelInstance = await returnModelyPK(primaryKey);

        modelInstance = gracefulModel404(modelInstance);

        if(!modelInstance)
            return modelInstance;   // `false`

        return new Companies(kwargsInitializeObject = modelInstance);
    }

    static async returnAllModels() {

        console.log(`${Companies.relationName}`)
        
        const result = await db.query(
            `SELECT *
            FROM ${Companies.relationName}`);

        if(result === undefined);
            return false;   // no results returned

    }

    static async returnAllModelsJSON(){

        const resultList = result.rows.map((element) => new Companies(kwargsInitializeObject = modelInstance));
        return resultList;
    }

    /* static async returnAllModelsObject(){

    // }    */

    async createDatabaseEntry(){
        // Create database entry.
        Companies.createUpdateQuery(this, 'create');
        return;
    }

    async updateDatabaseEntry(){
        // Commit changes to object. Use only after middleware confirming existence.
        Companies.createUpdateQuery(this, 'update');
        return;
    }

    async deleteDatabaseEntry(){
        // Remove the specified model instance. Note this is good because it eases testing. Use only after middleware confirming existence.
        await db.query(
            `DELETE FROM companies
            WHERE id=$1`, [this.code]);
        return;
    }

    // ...

}

class Invoices{


}

module.exports = {
    Companies,
    Invoices
};