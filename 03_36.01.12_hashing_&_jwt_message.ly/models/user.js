/** User class for message.ly */
const {Model, dbClient} = require('./pgModel');

class User extends Model{

	constructor(kwargObjectParameters = undefined){

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
			WHERE username = $1`,
			[primaryKey]);

		if(result.rows[0] === undefined)
			return false;

		return this.gracefulModel404(result.rows[0]);	
	}

	/*	Replaced by returnAllModels()	*/
	static async all() {
	/* All: basic info on all users:
	 * [{username, first_name, last_name, phone}, ...] */

		//implemented already as 'returnAllModels()'

	}	

	static async returnModelByPK(primaryKey){
		// Returns a model by PK in the database, general. Returns `.json`. Gracefully returns false if DNE.
		const result = await db.query(
			`SELECT *
			FROM ${this.relationName}
			WHERE username = $1`,
			[primaryKey]);
	
		return this.gracefulModel404(result.rows[0]);
	}

	/*	Replaced by returnModelByPK()	*/
	static async get(username) {
	/*	Get: get user by username
	 *
	 *	returns {username, first_name, last_name, phone, join_at, last_login_at } */	

	}

	static async deleteModelByPK(primaryKey){
		// Delete a record in the database by primary key. Use only after middleware confirming existence.
		const result = await db.query(
			`DELETE FROM ${this.relationName}
			WHERE username = $1`,
			[primaryKey]);
			 
		return RESPONSE_MESSAGE_MAPPING['deleted'];
	}

	static async register({username, password, first_name, last_name, phone}) {
		/** register new user -- returns
		*    {username, password, first_name, last_name, phone}
		*/


	}

	static async authenticate(username, password) {
		/** Authenticate: is this username/password valid?
		 * 
		 * Returns boolean.
		 */
		
		
	}
	
	static async updateLoginTimestamp(username) {
		/** Update last_login_at for user */
	
	
	}

	static async messagesFrom(username) {
	/*	Return messages from this user.
	 *	
	 *	[{id, to_user, body, sent_at, read_at}]
	 *
	 *	where to_user is
	 *		{username, first_name, last_name, phone}
	 */


		
	}

	static async messagesTo(username) {
	/*	Return messages to this user.
	 *	
	 *	[{id, from_user, body, sent_at, read_at}]
	 *	
	 *	where from_user is
	 *   {username, first_name, last_name, phone}
	 */	

	}

module.exports = User;