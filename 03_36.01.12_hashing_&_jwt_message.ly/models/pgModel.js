  /**	`pgModels.js`. A lightweight library built on top of a native raw SQL, `node-pg` to provide support to some ORM features. Built by Yi J. Zhang.
	*	Current Build Dependencies:
	*		- `pg`
	*		- `jsonschema`?
	*	To Do List
	*	==========
	*		- 
	*		- Integrate JSONSchema for Schema Validation (03_36.02.ab)
	*		- Method: handlePSQLErrors()
	*		- 
	*
	*	Subclass Boilerplate
	*	====================
	*	Minimize `class Model {...}` to view
	*
	*	Version History
	*	===============
	*	Version 03:
	*	Version 02b:  
	*	Version 02a: Current Version for `Springboard Assignment 03_36.01.12` (2022-10-05). Renamed to `pgModels` as a temporary name placeholder. Cleaning up comments and documentation. Changes reflect that `ExpressError` class is integrated with `utilties.js`.
	*	Version 01: Generalized to `Model` `class`js for `Springboard Assignemnt 03_35.02.07` (2022-09-26 - 2022-09-29): https://github.com/YiJohnZhang/sb_u03_assignments/blob/main/03_35.02.07_node-pg_m-n_relationships/models.js. This is a stop-gap implementation and does not support models with composite primary keys. Expects developer to define the following methods in the following circumstances:
	*		 - Always: constructor(), validateConstructedObject(), __repr__() (if debugging), static destructureObjectProperties(), static confirmModelByPK(), static returnModelByPK(), static deleteModelByPK()
	*		 - If Handling Composite Keys: 
	*	Version 00 (INIT): Exists as the `Company` `class`js for `Springboard Assignment 03_35.01.11` (2022-09-24 - 2022-09-25): https://github.com/YiJohnZhang/sb_u03_assignments/blob/main/03_35.01.11_node-pg_Introduction_(biztime-01)/models.js
	*/

//  Module(s)
//  =========
const dbClient = require('../database/db');

//  Environment Variable(s) & Constant(s)
//  =====================================
const {RESPONSE_MESSAGE_MAPPING, ExpressError} = require('../modules/utilities')

class Model{
	/*	Base class for pgModel.js
	 *	To use this define a class and extend the alias assigned for `Model`. See 'Subclass Boilerplate' for the current version's unimplemented methods.
	 *	Contains general methods for the basic instance of itself.
	 */
	
	static relationName;

	constructor(relationName){
		this.constructor.relationName = relationName;	// this is introducing a 'relationName' column
	}

	__repr__(){
		// Self-representation of an instance of this class.
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
		 *		- destructureObjectProperties(...).primaryObjectProperties: Immutable properties, primary keys.
		 *		- destructureObjectProperties(...).mutableObjectProperties: Mutable properties, other properties.
		 */
		  
		/*  To handle primary key properties and otherwise, I could store all properties into a "modelPropertyObject"
		 *  i.e.
		 *		const (this.)modelPropertyObject = {
		 *			 primaryKeyProperties = [..., ...],
		 *			 propertyOneName = {type: int, nullable:true, unique:false, defaultValue:undefined, primaryKey: false, foreignKey: false},	// sample list of default values initialized to an object
		 *			 primaryKeyProperty = {type:int, nullable:true, unique:true, defaultValue:null, primaryKey:true},									 // a sample SERIAL PRIMARY KEY 
		 *			 propertyTwoName = {}
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
		return new this(kwargObjectParameters);
	}
	 
	static async confirmModelByPK(primaryKey){
		// Confirms whether or not the primary key exists in the database; only returns the primary key prevent returning sensitive information. Intended for middleware to validate existence.
		// 2022-09-27: Consider `SELECT ${primarykeyQueryParameterizationBuilder().parameters} FROM ${this.relationName} WHERE ${primarykeyQueryParameterizationBuilder().parameterizations}`, [primarykeyQueryParameterizationBuilder().queryParameters]
		throw new Error('Method \'confirmModelByPK()\' must be implemented.');
	}

	static async returnModelByPK(primaryKey){
		// Returns a model by PK in the database, general. Returns `.json`. Gracefully returns false if DNE.
		// 2022-09-27 Note: maybe inject primaryKey by some method that can generate a composite primary key (splat... `this:127`: const primaryKeyParameterization = primaryKeyArguments.join('AND ');) be generated by a helper function?
		throw new Error('Method \'returnModelByPK()\' must be implemented.');
	}

	static async returnModelObjectByPK(primaryKey) {
		// Returns a model by PK in the database, developed with intention for updating. Gracefully returns false if DNE.

		const modelParameters = await this.returnModelByPK(primaryKey);
		  
		if(!modelParameters)
			return modelParameters;	// 'false'

		return new this(modelParameters);
	}

	static async returnAllModels() {
		// Returns all models in the database, general. Returns `.json`. Gracefully returns false if DNE.
		  
		const result = await dbClient.query(
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
		throw new Error('Method \'deleteModelByPK()\' must be implemented.');
	}
	 
	// Instance Methods
	async createDatabaseEntry(returnJSON = true){
		// Create database entry.
		// 2022-09-25: Ideally this would be a class method; maybe once I figure out a form module.

		// const objectExists = await this.constructor.confirmModelByPK(this.code);
		// if(objectExists)
		//	  throw new ExpressError('409alreadyExists');
		//	  // do a helper method to handle postgres errors

		const result = await this.constructor.splatCreateUpdateHelper(this, 'create');

		if(returnJSON)
			return result.rows[0];

		return;
	}

	async updateDatabaseEntry(returnJSON = true){
		// Commit changes to object. Use only after middleware confirming existence.
	  
		const result = await this.constructor.splatCreateUpdateHelper(this, 'update');
	  
		if(returnJSON)
			return result.rows[0];

		return result;
	}

	async deleteDatabaseEntry(){
		// Remove the specified model instance. Note this is good because it eases testing. Use only after middleware confirming existence.
		const result = await this.constructor.deleteModelByPK(this.code);
		return result;
	}

}

module.exports = {Model, dbClient};

/*	Subclass Boilerplate:
class ModelName extends Model{

	static relationName = 'table_name';

	constructor(kwargObjectParameters = undefined, ...){

		super(ModelName.relationName);

		if(kwargObjectParameters){
			Object.assign(this, kwargObjectParameters);
		}else{
			// requrired properties; probably depcrated after using JSONSchema Validator
		}

	}

	validateConstructedObject(){
		//validate requried properties; deprecatred after using JSONSchema Validator
	}

	__repr__(){
		// Self-representation of an instance of this class.
		return `<${this.constructor.relationName} ${this.primaryKey}: ${this.propertyOne}>`;
	}	

	static destructureObjectProperties(modelObject, operation){
		//	Destructures the passed in model object into immutable properties (i.e. primary key) and mutable properties (other properties)
		//  Returns an object nested with two objects:
		//		- destructureObjectProperties(...).primaryObjectProperties: Immutable properties, primary keys.
		//		- destructureObjectProperties(...).mutableObjectProperties: Mutable properties, other properties.
		
		//	pop the primary key(s) if necessary (i.e. serial)
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
	}

	static async confirmModelByPK(primaryKey){
		// Confirms whether or not the primary key exists in the database; only returns the primary key prevent returning sensitive information. Intended for middleware to validate existence.
		const result = await db.query(
			`SELECT primaryKey
			FROM ${this.relationName}
			WHERE primaryKey = $1`,
			[primaryKey]);

		if(result.rows[0] === undefined)
			return false;

		return this.gracefulModel404(result.rows[0]);	
	}

	static async returnModelByPK(primaryKey){
		// Returns a model by PK in the database, general. Returns `.json`. Gracefully returns false if DNE.
		const result = await db.query(
			`SELECT *
			FROM ${this.relationName}
			WHERE primaryKey = $1`,
			[primaryKey]);
	
		return this.gracefulModel404(result.rows[0]);
	}

	static async deleteModelByPK(primaryKey){
		// Delete a record in the database by primary key. Use only after middleware confirming existence.
		const result = await db.query(
			`DELETE FROM ${this.relationName}
			WHERE primaryKey = $1`,
			[primaryKey]);
			 
		return RESPONSE_MESSAGE_MAPPING['deleted'];
	}
}
*/