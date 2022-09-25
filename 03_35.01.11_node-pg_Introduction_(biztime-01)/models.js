// Modules
const db = require('./database/db');
const ExpressError = require('./modules/classExpressError');

// Constants
const {RESPONSE_MESSAGE_MAPPING} = require('./modules/CONSTANTS')


class Companies {

    // Class Properties
    static relationName = 'companies';
        // name of the table

    constructor(kwargsInitializeObject = undefined, code = undefined, name = null, description = null){
        
        if(kwargsInitializeObject){
            Object.assign(this, kwargsInitializeObject);
        }else{

            this.constructor.validateConstructedObject(code, name);
            this.code = code;
            this.name = name;

        }

        this.constructor.validateConstructedObject(this.code, this.name);

        this.description = description;
        // ...

    }

    static validateConstructedObject(code, name){
        // properties that cannot be null
        
        // note: (typeof code === 'null' || 'undefined') is `undefined`
        if(code === null || code === undefined || code === '')
            throw new Error('Company \'code\' cannot be empty or null.');

        if(name === null || name === undefined || name === '')
            throw new Error('Company \'name\' cannot be empty or null.');
        
        return;

    }

    __repr__(){
        return `<${this.constructor.name} ${this.code}: ${this.name}>`;
    }

    // Static Methods
    static handlePSQLErrors(){
        /*
        Unique Code Violation
        error: duplicate key value violates unique constraint "companies_pkey"
            at Parser.parseErrorMessage 
            ...
            code: 23505
            detail: 'Key (property)=(attemptedValue) already exists.',
            ...
            schema: 'public',
            table: 'relationname',
            column: undefined,
            dataType: undefined,
            constraint: 'relationanme_pkey',
            ...
            file: 'nbtinsert.c',
            line: '649',
            routine: '_bt_check_unique'

        */
    }
    
    static splatCreateUpdateHelper(modelInstance, operation){
        
        if(operation == 'create'){
            var {...mutableModelProperties} = modelInstance;
        }else if(operation == 'update'){
            var {code, ...mutableModelProperties} = modelInstance;
        }

        let queryString;
        const objectKeys = Object.keys(mutableModelProperties);
        const objectValues = Object.values(mutableModelProperties);
        
        if(operation == 'create'){
            
            const keyArguments = objectKeys.join(',');
            const queryArguments = objectKeys.map((objectKey, index) => `$${index+1}`);
            const queryParameterization = queryArguments.join(',');

            queryString = `INSERT INTO ${this.relationName} (${keyArguments})
                VALUES (${queryParameterization}) RETURNING *`;

        }else if(operation == 'update'){

            const queryArguments = objectKeys.map((objectKey, index) => `${objectKey} = $${index+1}`);
            const queryParameterization = queryArguments.join(',');

            queryString = `UPDATE ${this.relationName} SET ${queryParameterization}
                WHERE code=\'${code}\'
                RETURNING *`;
                // RETURNING pk only because it may return columns with sensitive data
                // const queryArgumentLength = queryArguments.length;
        }

        return db.query(queryString, objectValues);
    }

    static async gracefulModel404(testObject){
        // Handle no results matched without raising 404.
        if (testObject === false || testObject === undefined || testObject === null)
            return new ExpressError('404graceful');

        return testObject;
    }

    static async confirmModelByPK(primaryKey){
        // Only confirm whether or not the primary key exists in the database to prevent returning sensitive information. Intended for middleware to validate existence.
        
        const result = await db.query(
            `SELECT code
            FROM ${this.relationName}
            WHERE code = $1`,
            [primaryKey]);
        
        if(result.rows[0] === undefined)
            return false;
            
        return result.rows[0];
    }

    static async returnModelByPK(primaryKey){
        // Returns a model by PK in the database, general. Returns `.json`. Gracefully returns false if DNE.
        
        const result = await db.query(
            `SELECT *
            FROM ${this.relationName}
            WHERE code = $1`,
            [primaryKey]);
        
        const resultContent = result.rows[0];

        return this.gracefulModel404(resultContent);
    }

    static async returnModelObjectByPK(primaryKey) {
        // Returns a model by PK in the database, developed with intention for updating. Gracefully returns false if DNE.
        
        const modelParameters = await this.returnModelByPK(primaryKey);
        
        if(!modelParameters)
            return modelParameters;   // `false`

        return new Companies(kwargsInitializeObject = modelParameters);
    }

    static async returnAllModels() {
        // Returns all models in the database, general. Returns `.json`. Gracefully returns false if DNE.
        
        const result = await db.query(
            `SELECT *
            FROM ${this.relationName}`);
        
        return this.gracefulModel404(result.rows);
    }

    static async returnAllModelsObject(){
        // Returns all model in the database, developed with intention for updating. Gracefully returns false if DNE.

        const result = this.returnAllModels();

        if(result === false)
            return result;

        const resultList = result.rows.map((element) => new Companies(kwargsInitializeObject = modelInstance));
        return resultList;
    }

    static async createModel(/**/){
        // no, force the developer to create an instance first in order to handle validation. port from `createDatabaseEntry` once I figure out a form module. --2022-09-25

        const newInstance = new Companies();
        const result = await newInstance.createDatabaseEntry();
        return;

    }

    static async updateModel(/**/){
        // no, force the developer to create and modify the instance first in order to handle validation.
    }

    static async deleteModelByPK(primaryKey){
        // Delete a record in the database by primary key. Use only after middleware confirming existence.

        const result = await db.query(
            `DELETE FROM ${this.relationName}
            WHERE code = $1`,
            [primaryKey]);
        
        return RESPONSE_MESSAGE_MAPPING['deleted'];

    }
    
    // Instance Methods
    async createDatabaseEntry(returnJSON = false){
        // Create database entry. Ideally this would be a class method; maybe once I figure out a form module. --2022-09-25 

        // const objectExists = await this.constructor.confirmModelByPK(this.code);
        // if(objectExists)
        //     throw new ExpressError('409alreadyExists');
        //     // do a helper method to handle postgres errors
        
        const result = await this.constructor.splatCreateUpdateHelper(this, 'create');

        if(returnJSON)
            return result.rows[0];

        return;
    }

    async updateDatabaseEntry(returnJSON = false){
        // Commit changes to object. Use only after middleware confirming existence.
        const result = await this.constructor.splatCreateUpdateHelper(this, 'update');

        if(returnJSON)
            return result.rows[0];

        return;
    }

    async deleteDatabaseEntry(){
        // Remove the specified model instance. Note this is good because it eases testing. Use only after middleware confirming existence.
        const result = await Companies.deleteModelByPK(this.code);
        return result;
    }

    // ...

}

class Invoices{


}

module.exports = {
    Companies,
    Invoices
};