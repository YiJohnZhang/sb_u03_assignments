const fs = require('fs');
const axios = require('axios');

const PATH = process.argv[2];

const cat = async (PATH) => {

    const fileContents = await fs.readFile(PATH, 'utf8', (error, data) => {

        if(error){
            console.log(`Error reading ${PATH}:`);
            console.log(error);
            process.exit(1);
        }
    
        console.log(data);
    });

}

const webCat = async (PATH) => {

    const webResponse = await axios.get(PATH);
    console.log(webResponse);

};

if (PATH.substring(0, 8) == 'https://'){

    webCat(PATH);

}else{

    cat(PATH);

}