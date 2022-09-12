const fs = require('fs');

const PATH = process.argv[2];

fs.readFile(PATH, 'utf8', (error, data) => {

    if(error){
        console.log(`Error reading ${PATH}:`);
        console.log(error);
        process.exit(1);
    }

    console.log(data);
});