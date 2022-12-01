const { readFileSync, promises: fsPromises } = require("fs");

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  let split = contents.split(/\r?\n/);
  let twoDArr = [[]];
  let count = 0;
  for (let i = 0; i < split.length; i++) {
    if (split[i] === "") {
      twoDArr.push([]);
      count++;
    } else {
      twoDArr[count].push(parseInt(split[i]));
    }
  }
  return twoDArr;
}

let twoDArr = syncReadFile("./input.txt");
let sumArr = [];
for (let i = 0; i < twoDArr.length; i++) {
  let sum = 0;
  for (let j = 0; j < twoDArr[i].length; j++) {
    if (twoDArr[i][j].length === 1) {
      sumArr.push(twoDArr[i][j]);
    } else {
      sum += twoDArr[i][j];
    }
  }
  sumArr.push(sum);
  sum = 0;
}

let max = Math.max(...sumArr);
console.log(
  sumArr.sort((a, b) => {
    return a - b;
  })
);

console.log(max);
console.log(sumArr.pop() + sumArr.pop() + sumArr.pop());
