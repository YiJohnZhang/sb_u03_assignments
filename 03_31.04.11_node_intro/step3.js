const fs = require('fs');
const axios = require('axios');

let READ_PATH;
let OUT_PATH;
let OUT_FLAG;

if (process.argv.length == 3){
    READ_PATH = process.argv[2];
}else{
    OUT_FLAG = process.argv[2] == '--out' ? true : false;
    OUT_PATH = process.argv[3];
    READ_PATH = process.argv[4];
}

const writeFile = async (data) => {

    try{
        fs.writeFileSync(OUT_PATH, data);
    }catch(error){
        console.log(error);
        process.exit(1);
    }

}


const cat = async (READ_PATH) => {

    const fileContents = await fs.readFile(READ_PATH, 'utf8', (error, data) => {

        if(error){
            console.log(`Error reading ${READ_PATH}:`);
            console.log(error);
            process.exit(1);
        }
        
        if(OUT_FLAG) {  // only if OUT_FLAG because if invalid path, it still attempts to write.
            writeFile(data);
        }else{
            console.log(data);
        }

    });

}

const webCat = async (READ_PATH) => {

    const webResponse = await axios.get(READ_PATH);
        
    if(OUT_FLAG) {
        writeFile(String(webResponse));
        // console.log(typeof webResponse);
    }else{
        console.log(webResponse);
    }

};

if (READ_PATH.substring(0, 8) == 'https://'){

    webCat(READ_PATH);

}else{

    cat(READ_PATH);

}