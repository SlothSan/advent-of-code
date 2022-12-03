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

function sumAllCommonItems (inputArray) {
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
    }
    return totalSum
}

function sumGroupsOf3 (inputArray) {
    let totalSum = 0;
    for (let i = 0; i < inputArray.length; i += 3) {
        let str1 = inputArray[i];
        let str2 = inputArray[i+1];
        let str3 = inputArray[i+2];
        for (let j = 0; j < str1.length; j++) {
            let currentLetter = str1[j]
            if(str2.includes(currentLetter) && str3.includes(currentLetter)) {
                totalSum += completeAlpha.indexOf(currentLetter) + 1;
                break;
            }
        }
    }
    return totalSum
}

console.log(sumAllCommonItems(inputArray));
console.log(sumGroupsOf3(inputArray))

