const fs = require("fs");
const { type } = require("os");
const path = require("path");
const { isNumberObject } = require("util/types");
let txt = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trim()
  .split(/\r\n/);

let answer_p1 = 0;
let answer_p2 = 0;
let cards = [];

const part1Solution = (txt) => {
  txt.forEach((input) => {
    let my_nums = [];
    let winning_nums = [];
    for (let i = 0; i < 10; i++)
      my_nums.push(input.substr(10 + i * 3, 2).trim());
    for (let i = 0; i < 25; i++)
      winning_nums.push(input.substr(42 + i * 3, 2).trim());
    //start at 0.5 as doubling makes 1.
    let value = 0.5;
    let matches = 0;
    my_nums.forEach((num) => {
      if (winning_nums.includes(num)) {
        value *= 2;
        matches++;
      }
    });
    cards.push([1, matches]);
    answer_p1 += Math.floor(value);
  });
  return answer_p1;
};

const part2Solution = () => {
  for (let i = 0; i < cards.length; i++) {
    answer_p2 += cards[i][0];
    for (var j = 1; j <= cards[i][1]; j++) {
      cards[i + j][0] = cards[i + j][0] + 1 * cards[i][0];
    }
  }
  return answer_p2;
};

console.log(part1Solution(txt));
console.log(part2Solution());
