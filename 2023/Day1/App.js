const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .split("\n");
const numbersMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const partOneSolution = (input) => {
  let result = 0;
  for (const line of input) {
    const digits = line.replace(/\D/g, "");
    result += parseInt(digits[0] + (digits[digits.length - 1] ?? digits[0]));
  }
  return result;
};

const partTwoSolution = (input) => {
  let result = 0;
  for (let line of input) {
    const numbers = [];
    for (const [key, value] of Object.entries(numbersMap)) {
      numbers.push(
        ...line.matchAll(new RegExp(key, "g")),
        ...line.matchAll(new RegExp(value, "g"))
      );
    }
    numbers.sort((a, b) => a.index - b.index);
    result += parseInt(
      `${
        numbers[0][0].length > 1
          ? numbersMap[numbers[0][0]]
          : parseInt(numbers[0][0])
      }${
        numbers[numbers.length - 1][0].length > 1
          ? numbersMap[numbers[numbers.length - 1][0]]
          : parseInt(numbers[numbers.length - 1][0])
      }`
    );
  }
  return result;
};

console.log(partOneSolution(input));
console.log(partTwoSolution(input));
