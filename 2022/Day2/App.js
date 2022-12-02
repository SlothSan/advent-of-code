const { readFileSync, promises: fsPromises } = require("fs");

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  return (arr = contents.split(/\r?\n/));
}

stratArr = syncReadFile("./input.txt");

function rockPaperScissors(arr) {
  let total = 0;
  arr.forEach((line) => {
    const round = line.split(" ");

    const myValue = round[1].charCodeAt(0) % 3;
    const theirValue = round[0].charCodeAt(0) % 3;

    total += myValue || 3;

    if (myValue - theirValue === 0) total += 6;
    if (myValue - theirValue === -1 || myValue - theirValue === 2) total += 3;
  });
  console.log(total);
}

function rockPaperScissorsTwo(arr) {
  let total = 0;
  arr.forEach((line) => {
    const round = line.split(" ");
    if (round[1] === "X") {
      total += (round[0].charCodeAt(0) + 22) % 3 || 3;
    }
    if (round[1] === "Y") {
      total += ((round[0].charCodeAt(0) + 23) % 3 || 3) + 3;
    }
    if (round[1] === "Z") {
      total += ((round[0].charCodeAt(0) + 24) % 3 || 3) + 6;
    }
  });
  console.log(total);
}

console.log(stratArr);
console.log(rockPaperScissors(stratArr));
console.log(rockPaperScissorsTwo(stratArr));
