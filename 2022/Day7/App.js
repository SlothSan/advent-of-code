const { readFileSync, promises: fsPromises } = require("fs");

function syncReadFile(filename) {
    let arr = []
    let input = readFileSync(filename, "utf-8");
    arr = input.split(/\r?\n/);
    return arr;
}


let input = syncReadFile("./input.txt")

let sum = 0; //Variable to store the first answer
let directory = {'/':{size:0}}; //Where I store all directories
let cwd = ['/']; //Current working directory
input.forEach( x => {
    x = x.split(' '); //I seperate each line into a list, eg: ['$', 'cd', 'sdfdsf']
    //Commands
    if(x[0] === '$') {
        if(x[1] === 'cd') {
            //Go back one level
            if(x[2] === '..') {
                cwd.pop();
            }
            //Go in directory
            else {
                const dirname = x[2];
                cwd.push(dirname); //I store the current path
                const fullpath = cwd.join('/');
                directory[fullpath]={};
                directory[fullpath].size=0;
            }
        }
    }
    else if(x[0] === 'dir') return;
    else {
        const fileSize = parseInt(x[0]);
        const temp = [];
        cwd.forEach(d=> {
            temp.push(d);
            const temp2 = temp.join('/');
            directory[temp2].size += fileSize;
        });
    }
});
//Answers:
for(dir in directory) {
    if(directory[dir].size <= 100000) sum += directory[dir].size;
}
const sizeToFree = directory['/'].size - 70000000 + 30000000
let closestSize = 70000000;
for(dir in directory) {
    if(directory[dir].size > sizeToFree && directory[dir].size < closestSize) closestSize = directory[dir].size;
}
console.log(directory);
console.log('Answer 1: ', sum);
console.log('Answer 2: ', closestSize);