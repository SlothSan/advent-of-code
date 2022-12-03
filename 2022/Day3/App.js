const { readFileSync, promises: fsPromises } = require("fs");

function syncReadFile(filename) {
    const contents = readFileSync(filename, "utf-8");
    return (arr = contents.split(/\r?\n/));
}


const alpha1 = Array.from(Array(26)).map((e, i) => i + 65);
const alpha2 = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet1 = alpha1.map((x) => String.fromCharCode(x));
const alphabet2 = alpha2.map((x) => String.fromCharCode(x).toLowerCase());
const completeAlpha = [...alphabet2, ...alphabet1];

let inputArray = syncReadFile("./input.txt")
let totalSum = 0;

for (let i = 0; i < inputArray.length; i++) {
    let letterMatch = '';
    let subStr1 = inputArray[i].slice(0, inputArray[i].length / 2)
    let subStr2 = inputArray[i].slice(inputArray[i].length / 2, inputArray[i].length);
    for (let j = 0; j < subStr1.length; j++) {
        let currentMatch = subStr1[j];
        if (subStr2.includes(currentMatch)) {
            letterMatch = currentMatch;
            totalSum += completeAlpha.indexOf(letterMatch) + 1;
            break;
        }
    }

    console.log(totalSum)

}

//         // for(let j = 0; j < subStr2.length; j++) {
//         //     if (currentMatch === subStr2[j]) {
//         //         letterMatch = subStr2[j];
//         //         console.log(letterMatch)
//         //         totalSum += completeAlpha.indexOf(letterMatch) + 1
//         //         break;
//         //     }
//         }
//     }
// }
//
// console.log(totalSum)

//Create a indexed array of a-z A-Z and return the score as that index + 1 and add it to the totalSum.
