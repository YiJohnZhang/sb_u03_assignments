/** Command-line tool to generate Markov text. */
const axios = require('axios');
const fs = require('fs');
const markov = require('./markov');
const markovLength = Math.floor(Math.random()*50);

const READ_TYPE = process.argv[2];
const READ_PATH = process.argv[3];


const printMarkov = (rawData) => {

    const stringData = String(rawData);
    const markovMachineInstance = new markov.MarkovMachine(stringData);

    const markovResult = markovMachineInstance.makeText(markovLength);
    console.log(markovResult.join(' '));

}

const readData = async (READ_PATH) => {

    if(READ_TYPE == 'file'){

        const fileContent = await fs.readFile(READ_PATH, 'utf8', (error, data) => {

            if(error){
                console.log(`Error reading ${READ_PATH}:`);
                console.log(error);
                process.exit(1);
            }

            printMarkov(String(data));

        });

    }else if(READ_TYPE == 'url'){
    
        const webContents = await axios.get(READ_PATH);
        // console.log(webContents.toString())
        
        printMarkov(webContents.toString());

    }else{
    
        console.log(`Error: Invalid read type, ${READ_TYPE}`);
        process.exit(1);
    
    }

}

readData(READ_PATH);

/*  Further Study: HTML Stripper
https://www.npmjs.com/package/strip_tags
*/
