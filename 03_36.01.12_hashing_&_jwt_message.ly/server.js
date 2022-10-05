  /** Starts the server.
	*/

const app = require('./app');
const {PORT_NUMBER} = require('./config') 
	
app.listen(PORT_NUMBER);