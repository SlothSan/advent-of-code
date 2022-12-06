const { readFileSync, promises: fsPromises } = require("fs");

function syncReadFile(filename) {
    return readFileSync(filename, "utf-8");
}

let contents = syncReadFile("./input.txt");

let checkPacket = (lengthOfPacket) => {
    let solution = [];
    let packet = lengthOfPacket;
    for(let i = packet; i < contents.length; i++) {
        let arr = [];
        for(let j = 0; j < packet; j++) {
            arr.push(contents[i - j]);
        }
        let x = 0;
        for(let x = 1; x <= packet; x++) {
            let checkThis = arr.pop()
            if(arr.includes(checkThis)) break //if the array includes it break
            else arr.unshift(checkThis) //if not add it to the beginning of the array.
            if(x === packet) solution.push(i + 1);
        }
    }
    return solution.shift();
}

console.log(checkPacket(4));
console.log(checkPacket(14));