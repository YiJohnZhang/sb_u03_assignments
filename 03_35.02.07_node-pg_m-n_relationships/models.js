// Modules
const db = require('./database/db');
const ExpressError = require('./modules/classExpressError');

// Constants
const {RESPONSE_MESSAGE_MAPPING} = require('./modules/CONSTANTS')

class Model{
    /*  stopgap implementation: each of the calling methods must be overridden because the default will raise an error of "implementation required" for:
     *      - constructor()
     *      - validateConstructedObject()
     *      *- __repr__()    => only for debugging
     *      - static destructureObjectProperties()
     *      - static confirmModelByPK()
     *      - static returnModelByPK()
     *      - static deleteModelByPK()
     */     
    static relationName;
    constructor(relationName){
        this.constructor.relationName = relationName;   // this is introducing a 'relationName' column
    }

    __repr__(){
        // Self-representation of an instance of this class.
        //  Pattern:
        //      return `<${this.constructor.relationName} ${this.primaryKey}: ${this.propertyOne}>`;
        throw new Error('Method \'__repr__()\' must be implemented.');
    }

    // 'static' Helper Methods
    static gracefulModel404(testObject){
        // Handle no results matched without raising 404.
        if (testObject === false || testObject === undefined || testObject === null)
            return new ExpressError('404graceful');

        return testObject;
    }

    // 'static' Querying Methods
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

    static destructureObjectProperties(modelObject, operation){
        /*  Destructures the passed in model object into immutable properties (i.e. primary key) and mutable properties (other properties)
         *  Returns an object nested with two objects:
         *      - destructureObjectProperties(...).primaryObjectProperties: Immutable properties, primary keys.
         *      - destructureObjectProperties(...).mutableObjectProperties: Mutable properties, other properties.
         */
        
        /*  To handle primary key properties and otherwise, I could store all properties into a "modelPropertyObject"
         *  i.e.
         *      const (this.)modelPropertyObject = {
         *          primaryKeyProperties = [..., ...],
         *          propertyOneName = {type: int, nullable:true, unique:false, defaultValue:undefined, primaryKey: false, foreignKey: false},   // sample list of default values initialized to an object
         *          primaryKeyProperty = {type:int, nullable:true, unique:true, defaultValue:null, primaryKey:true},                            // a sample SERIAL PRIMARY KEY 
         *          propertyTwoName = {}
         */ 

        /*
        
        // pop the primary key(s) if necessary (i.e. serial)

        if(operation == 'create'){
            // primaryObjectProperties = ;
            var {mutableObjectProperties} = modelObject;
        }else if(operation == 'update'){
            var {code, ...mutableObjectProperties} = modelObject;
            // var {code:primaryObjectProperties, ...mutableObjectProperties} is non-general for composite key objects. probably do a .map() to assign to an array if I decide to build an object to store all model properties
        }

        return {
            primaryObjectProperties: {code: modelObject.code},
            mutableObjectProperties
        }
        */

        throw new Error('Method \'destructureObjectProperties()\' must be implemented.');

    }

    static splatCreateUpdateHelper(modelObject, operation){
        // there has to be a better implementation; **kwargs? *args? i.e. how can I pass **kwargs or *args rather than destructure what I passed in as **kwargs?
        // 2022-09-27 Note: Consider https://stackoverflow.com/a/17381144
        
        const destructuredObjectProperties = this.destructureObjectProperties(modelObject, operation);
            //  - destructuredObjectProperties.primaryObjectProperties: Immutable properties, primary keys.
            //  - destructuredObjectProperties.mutableObjectProperties: Mutable properties, other properties.
 
        const mutableObjectKeys = Object.keys(destructuredObjectProperties.mutableObjectProperties);
        const mutableObjectValues = Object.values(destructuredObjectProperties.mutableObjectProperties);
        
        let queryString;
        let queryParameters = mutableObjectValues;
        
        if(operation == 'create'){
            
            const keyArguments = mutableObjectKeys.join(',');
            const queryArguments = mutableObjectKeys.map((objectKey, index) => `$${index+1}`);
            const queryParameterization = queryArguments.join(',');

            queryString = `INSERT INTO ${this.relationName} (${keyArguments})
                VALUES (${queryParameterization}) RETURNING *`;

        }else if(operation == 'update'){

            const primaryObjectKeys = Object.keys(destructuredObjectProperties.primaryObjectProperties);
            const primaryObjectValues = Object.values(destructuredObjectProperties.primaryObjectProperties);

            const queryArguments = mutableObjectKeys.map((objectKey, index) => `${objectKey} = $${index+1}`);
            const queryParameterization = queryArguments.join(',');

            const primaryKeyArguments = primaryObjectKeys.map((objectKey, index) => `${objectKey} = $${queryArguments.length + index+1}`);
                // queryArguments.length + (0) + 1 => continued parameterization
            const primaryKeyParameterization = primaryKeyArguments.join(' AND ');

            primaryObjectValues.forEach((element) => queryParameters.push(element));

            queryString = `UPDATE ${this.relationName} SET ${queryParameterization}
                WHERE ${primaryKeyParameterization}
                RETURNING *`;
                // 2022-09-27 Note: This does not work with composite keys yet. Needs work with the destructuring modelObject
                // RETURNING pk only because it may return columns with sensitive data
                // const queryArgumentLength = queryArguments.length;
        }
        
        return db.query(queryString, queryParameters);
    }

    static returnObjectFromParameters(kwargObjectParameters){
        // Returns a model from the parameters provided.
        // console.log(`asdf:${(new this(kwargObjectParameters)).__repr__()}`)
        return new this(kwargObjectParameters);

    }
    
    static async confirmModelByPK(primaryKey){
        // Only confirm whether or not the primary key exists in the database to prevent returning sensitive information. Intended for middleware to validate existence.
            /*  pattern:
                const result = await db.query(
                    `SELECT primaryKey
                    FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
            
                if(result.rows[0] === undefined)
                    return false;
            
                return this.gracefulModel404(result.rows[0]);
                2022-09-27: Consider `SELECT ${primarykeyQueryParameterizationBuilder().parameters} FROM ${this.relationName} WHERE ${primarykeyQueryParameterizationBuilder().parameterizations}`, [primarykeyQueryParameterizationBuilder().queryParameters]
            */

        throw new Error('Method \'confirmModelByPK()\' must be implemented.');

    }

    static async returnModelByPK(primaryKey){
        // 2022-09-27 Note: maybe inject primaryKey by some method that can generate a composite primary key (splat... `this:127`: const primaryKeyParameterization = primaryKeyArguments.join(' AND ');) be generated by a helper function?
        // Returns a model by PK in the database, general. Returns `.json`. Gracefully returns false if DNE.
            /*  pattern:
                const result = await db.query(
                    `SELECT *
                    FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
            
                return this.gracefulModel404(result.rows[0]);
            */

        throw new Error('Method \'returnModelByPK()\' must be implemented.');

    }

    static async returnModelObjectByPK(primaryKey) {
        // Returns a model by PK in the database, developed with intention for updating. Gracefully returns false if DNE.

        const modelParameters = await this.returnModelByPK(primaryKey);
        
        if(!modelParameters)
            return modelParameters;   // `false`

        return new this(modelParameters);
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

        const result = await this.returnAllModels();

        if(result === false)
            return result;

        const resultList = result.map((modelElement) => this.returnObjectFromParameters(modelElement));
            //  this returns the constructor correctly:
            //[class Invoices extends Model] { relationName: 'invoices' }

        return resultList;
    }

    static async createModel(/**/){
        // 2022-09-25: no, force the developer to create an instance first in order to handle validation. port from `createDatabaseEntry` once I figure out a form module.

        // const newInstance = new Companies();
        // const result = await newInstance.createDatabaseEntry();
        return;

    }

    static async updateModel(/**/){
        // 2022-09-25: (see `static createModel()` above)no, force the developer to create and modify the instance first in order to handle validation.
    }

    static async deleteModelByPK(primaryKey){
        // Delete a record in the database by primary key. Use only after middleware confirming existence.
            /*  pattern:
                const result = await db.query(
                    `DELETE FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
                
                return RESPONSE_MESSAGE_MAPPING['deleted'];
            */

        throw new Error('Method \'deleteModelByPK()\' must be implemented.');

    }
    
    // Instance Methods
    async createDatabaseEntry(returnJSON = false){
        // Create database entry.
        // 2022-09-25: Ideally this would be a class method; maybe once I figure out a form module.

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
        const result = await this.constructor.deleteModelByPK(this.code);
        return result;
    }

}

class Companies extends Model{

    static relationName = 'companies';

    constructor(kwargObjectParameters = undefined, code, name, description = null){
        
        super(Companies.relationName);

        if(kwargObjectParameters){
            Object.assign(this, kwargObjectParameters);
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
            throw new Error('Companies \'code\' cannot be empty or null.');

        if(name === null || name === undefined || name === '')
            throw new Error('Companies \'name\' cannot be empty or null.');
        
        return;

    }

    __repr__(){
        // Self-representation of an instance of this class.
        return `<${this.constructor.relationName} ${this.code}: ${this.name}>`;
    }

    static destructureObjectProperties(modelObject, operation){
        /*  Destructures the passed in model object into immutable properties (i.e. primary key) and mutable properties (other properties)
         *  Returns an object nested with two objects:
         *      - destructureObjectProperties(...).primaryObjectProperties: Immutable properties, primary keys.
         *      - destructureObjectProperties(...).mutableObjectProperties: Mutable properties, other properties.
         */

        if(operation == 'create'){
            // primaryObjectProperties = ;
            var {...mutableObjectProperties} = modelObject;
        }else if(operation == 'update'){
            var {code, ...mutableObjectProperties} = modelObject;
            // var {code:primaryObjectProperties, ...mutableObjectProperties} is non-general for composite key objects. probably do a .map() to assign to an array if I decide to build an object to store all model properties
        }

        return {
            primaryObjectProperties: {code: modelObject.code},
            mutableObjectProperties
        }

    }
    
    static async confirmModelByPK(primaryKey){
        // Only confirm whether or not the primary key exists in the database to prevent returning sensitive information. Intended for middleware to validate existence.
            /*  pattern:
                const result = await db.query(
                    `SELECT primaryKey
                    FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
            
                if(result.rows[0] === undefined)
                    return false;
            
                return this.gracefulModel404(result.rows[0]);
            */

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
            /*  pattern:
                const result = await db.query(
                    `SELECT *
                    FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
            
                return this.gracefulModel404(result.rows[0]);
            */

        const result = await db.query(
            `SELECT *
            FROM ${this.relationName}
            WHERE code = $1`,
            [primaryKey]);
            // PRIMARY KEY = $1
        
        return this.gracefulModel404(result.rows[0]);
        
    }

    static async deleteModelByPK(primaryKey){
        // Delete a record in the database by primary key. Use only after middleware confirming existence.
            /*  pattern:
                const result = await db.query(
                    `DELETE FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
                
                return RESPONSE_MESSAGE_MAPPING['deleted'];
            */

        const result = await db.query(
            `DELETE FROM ${this.relationName}
            WHERE code = $1`,
            [primaryKey]);
            // PRIMARY KEY = $1
        
        return RESPONSE_MESSAGE_MAPPING['deleted'];

    }

    // ...

}

class Invoices extends Model{

    static relationName = 'invoices';

    constructor(kwargObjectParameters = undefined, id = null, comp_code, paid = null, add_date = null, paid_date = null){

        super(Invoices.relationName);

        if(kwargObjectParameters){
            Object.assign(this, kwargObjectParameters);
        }else{

            this.constructor.validateConstructedObject(comp_code);
            this.id = id;       // model-side nullable primary key
            this.code = code;
            this.paid = paid;
            this.add_date = add_date;
            this.paid_date = paid_date;

        }


        this.constructor.validateConstructedObject(this.comp_code);

    }

    static validateConstructedObject(comp_code){
        // Properties that cannot be null

        if(comp_code === null || comp_code === undefined || comp_code === '')
            throw new Error('Invoices \'comp_code\' cannot be empty or null.');
        
        return;

    }

    __repr__(){
        // Self-representation of an instance of this class.
        return `<${this.constructor.relationName} ${this.id}: ${this.comp_code}>`;
    }

    static destructureObjectProperties(modelObject, operation){
        /*  Destructures the passed in model object into immutable properties (i.e. primary key) and mutable properties (other properties)
         *  Returns an object nested with two objects:
         *      - destructureObjectProperties(...).primaryObjectProperties: Immutable properties, primary keys.
         *      - destructureObjectProperties(...).mutableObjectProperties: Mutable properties, other properties.
         */

        const {id, ...mutableObjectProperties} = modelObject;
        return {
            primaryObjectProperties: {id: modelObject.id},
            mutableObjectProperties
        }

    }
    
    static async confirmModelByPK(primaryKey){
        // Only confirm whether or not the primary key exists in the database to prevent returning sensitive information. Intended for middleware to validate existence.
            /*  pattern:
                const result = await db.query(
                    `SELECT primaryKey
                    FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
            
                if(result.rows[0] === undefined)
                    return false;
            
                return this.gracefulModel404(result.rows[0]);
            */

        const result = await db.query(
            `SELECT id
            FROM ${this.relationName}
            WHERE id = $1`,
            [primaryKey]);
        
        if(result.rows[0] === undefined)
            return false;
            
        return result.rows[0];

    }

    static async returnModelByPK(primaryKey){
        // Returns a model by PK in the database, general. Returns `.json`. Gracefully returns false if DNE.
            /*  pattern:
                const result = await db.query(
                    `SELECT *
                    FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
            
                return this.gracefulModel404(result.rows[0]);
            */
        
        const result = await db.query(
            `SELECT *
            FROM ${this.relationName}
            WHERE id = $1`,
            [primaryKey]);
            // PRIMARY KEY = $1
        
        return this.gracefulModel404(result.rows[0]);
        
    }

    static async deleteModelByPK(primaryKey){
        // Delete a record in the database by primary key. Use only after middleware confirming existence.
            /*  pattern:
                const result = await db.query(
                    `DELETE FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
                
                return RESPONSE_MESSAGE_MAPPING['deleted'];
            */

        const result = await db.query(
            `DELETE FROM ${this.relationName}
            WHERE id = $1`,
            [primaryKey]);
            // PRIMARY KEY = $1
        
        return RESPONSE_MESSAGE_MAPPING['deleted'];

    }

    handlePaymentLogic(paymentParameters){

        console.log('---')
        const {paid, amt} = paymentParameters;

        if(this.amt !== null || this.amt !== undefined)
            this.amt = amt;

        if (this.paid){
            // current state is paid

            if(paid == false){
                // set `paid_date` to null
                this.paid = false;
                this.paid_date = null;

            }

            // otherwise do nothing else.

        }else{
            // current state is not paid
            const date = new Date();
            this.paid_date = date;
            this.paid = true;
        }

        return this.updateDatabaseEntry(true);
        
    }

    // ...

}

class Industries extends Model{

    static relationName = 'industries';

    constructor(kwargObjectParameters = undefined, code = null, industry_field = null){
        
        super(Industries.relationName);

        if(kwargObjectParameters){
            Object.assign(this, kwargObjectParameters);
        }else{

            this.constructor.validateConstructedObject(code, industry_field);
            this.industry_field = industry_field;
            this.code = code;

        }

        this.constructor.validateConstructedObject(this.code, this.industry_field);

    }

    static validateConstructedObject(code, industry_field){
        // Properties that cannot be null

        if(code === null || code === undefined || code === '')
            throw new Error('Invoices \'code\' cannot be empty or null.');

        if(industry_field === null || industry_field === undefined || industry_field === '')
            throw new Error('Invoices \'industry_field\' cannot be empty or null.');
        
        return;

    }

    __repr__(){
        // Self-representation of an instance of this class.
        return `<${this.constructor.relationName} ${this.code}: ${this.industry_field}>`;
    }

    static destructureObjectProperties(modelObject, operation){
        /*  Destructures the passed in model object into immutable properties (i.e. primary key) and mutable properties (other properties)
         *  Returns an object nested with two objects:
         *      - destructureObjectProperties(...).primaryObjectProperties: Immutable properties, primary keys.
         *      - destructureObjectProperties(...).mutableObjectProperties: Mutable properties, other properties.
         */

        if(operation == 'create'){
            // primaryObjectProperties = ;
            var {...mutableObjectProperties} = modelObject;
        }else if(operation == 'update'){
            var {...mutableObjectProperties} = modelObject;
            // var {code:primaryObjectProperties, ...mutableObjectProperties} is non-general for composite key objects. probably do a .map() to assign to an array if I decide to build an object to store all model properties
        }

        return {
            primaryObjectProperties,
            mutableObjectProperties
        }

    }

    static async confirmModelByPK(primaryKey){
        // Only confirm whether or not the primary key exists in the database to prevent returning sensitive information. Intended for middleware to validate existence.
            /*  pattern:
                const result = await db.query(
                    `SELECT primaryKey
                    FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
            
                if(result.rows[0] === undefined)
                    return false;
            
                return this.gracefulModel404(result.rows[0]);
            */

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
            /*  pattern:
                const result = await db.query(
                    `SELECT *
                    FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
            
                return this.gracefulModel404(result.rows[0]);
            */
           
        const result = await db.query(
            `SELECT *
            FROM ${this.relationName}
            WHERE code = $1`,
            [primaryKey]);
                // TO DO: (industry_field, code)
        
        return this.gracefulModel404(result.rows[0]);
        
    }

    static async deleteModelByPK(primaryKey){
        // Delete a record in the database by primary key. Use only after middleware confirming existence.
            /*  pattern:
                const result = await db.query(
                    `DELETE FROM ${this.relationName}
                    WHERE primaryKey = $1`,
                    [primaryKey]);
                
                return RESPONSE_MESSAGE_MAPPING['deleted'];
            */

        const result = await db.query(
            `DELETE FROM ${this.relationName}
            WHERE industry_field = $1 AND code = $2`,
            [primaryKey]);
            // PRIMARY KEY = $1
        
        return RESPONSE_MESSAGE_MAPPING['deleted'];

    }

    // need to add a joint industry, company method
    // Instance Methods
    async createDatabaseEntry(returnJSON = false){
        // Create database entry.
        // 2022-09-25: Ideally this would be a class method; maybe once I figure out a form module.

        // const objectExists = await this.constructor.confirmModelByPK(this.code);
        // if(objectExists)
        //     throw new ExpressError('409alreadyExists');
        //     // do a helper method to handle postgres errors

        const result = await db.query(
            `INSERT INTO ${this.constructor.relationName} (code, industry_field)
                VALUES ($1, $2)
                RETURNING *`,
                [this.code, this.industry_field]);
                // TO DO: (industry_field, code)

        if(returnJSON)
            return result.rows[0];

        return;
    }

}

class JoinCompaniesIndustries extends Model{

    static relationName = 'companies_industries_join';

    constructor(kwargObjectParameters = undefined, industries_code, company_code){

        super(JoinCompaniesIndustries.relationName);

        if(kwargObjectParameters){
            Object.assign(this, kwargObjectParameters);
        }else{

            this.constructor.validateConstructedObject(industries_code, company_code);
            this.industries_code = industries_code;       // model-side nullable company_code key
            this.company_code = company_code;

        }

        this.constructor.validateConstructedObject(this.industries_code, this.company_code);

    }

    static validateConstructedObject(industries_code, company_code){
        // Properties that cannot be null

        if(industries_code === null || industries_code === undefined || industries_code === '')
            throw new Error('companies_industries_join \'industries_code\' cannot be empty or null.');
        
        if(company_code === null || company_code === undefined || company_code === '')
            throw new Error('companies_industries_join \'company_code\' cannot be empty or null.');
        
        return;

    }

    __repr__(){
        // Self-representation of an instance of this class.
        return `<${this.constructor.relationName} (${this.industries_code}, ${this.company_code})>`;
    }

    static async returnModelByPK(industries_code, company_code){

        if (industries_code === null || industries_code === undefined || company_code === null || company_code === undefined)
            throw new Error('Invalid parameters.');
        
        const result = await db.query(
            `SELECT *
            FROM ${this.relationName}
            WHERE industries_code = $1 AND company_code = $2`,
            [industries_code, company_code]);
    
        return result.rows[0];

    }

    static async returnModelsByCompany(company_code){

        // no need to check for empty strings since the database will always return no results.
        if (company_code === null || company_code === undefined)
            throw new Error('Invalid parameters.');
        
        const result = await db.query(
            `SELECT *
            FROM ${this.relationName}
            WHERE company_code = $1`,
            [company_code]);
    
        return result.rows;

    }

    // Instance Methods
    async createDatabaseEntry(returnJSON = false){
        // Create database entry.
        // 2022-09-25: Ideally this would be a class method; maybe once I figure out a form module.

        // const objectExists = await this.constructor.confirmModelByPK(this.code);
        // if(objectExists)
        //     throw new ExpressError('409alreadyExists');
        //     // do a helper method to handle postgres errors

        const result = await db.query(`
            INSERT INTO ${this.constructor.relationName} (industries_code, company_code)
            VALUES ($1, $2)
            RETURNING *`,
            [this.industries_code, this.company_code]);

        if(returnJSON)
            return result.rows[0];

        return;
    }

}


module.exports = {
    Companies,
    Invoices, 
    Industries,
    JoinCompaniesIndustries
};