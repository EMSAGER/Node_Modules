//Add a feature where, on the command line, you can optionally provide an argument to output to a file instead of printing to the console. 
//The argument should look like this: --out output-filename.txt readfile-or-url.

//Current features should still work the same:


//import the required libraries

const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(txt, out){
    //this function will write the file out OR console log -- depending on the out
    if(out) {
        fs.writeFile(out, txt, 'utf-8', function(e){
            if (e) {
                console.error(`Error: ${e}`);
                process.exit(1);
            }
        });
    } else {
        console.log(txt);
    }
}

// reads file @ path & prints it out
function cat(path, out){
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            handleOutput(data, out);
        } 
    });
}

// reads URL page and prints it out
async function webCat(url, out){
    //USE TRY & CATCH
    try {
        let res = await axios.get(url);
        handleOutput(res.data, out);
    }
    catch(err){
        console.error(`Error reading ${url} : ${err}`);
        process.exit(1);
    }
}

//handle the inline coding for the different path/out
//The argument should look like this: --out output-filename.txt readfile-or-url.

let path;
let out; 

// process.argv[2]: The first user-provided argument
if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (!path){
    console.error(`No ${path} provided`);
    process.exit(1);
}

if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}
