//In step1.js, write a function, cat.It should take one argument, path, and it should read the file with that path, and print the contents of that file.


//import the required libraries
const fs = require('fs');
const process = require('process');

function cat(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

// Here’s what each element of process.argv would be:

// process.argv[0]: The path to the Node.js executable
// process.argv[1]: The path to your script file
// process.argv[2]: The first user-provided argument

cat(process.argv[2]);