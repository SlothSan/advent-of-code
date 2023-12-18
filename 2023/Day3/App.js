const fs = require("fs");
const path = require("path");
let txt = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
let inputs = txt.trim().split("\n");
let answer = 0;
let answer_p2 = 0;
let pc_part2 = {};
let special_chars = [];

//PART 1
function part1() {
  for (let x of inputs) {
    for (let y of x) {
      if (isNaN(y) && y != "." && !special_chars.includes(y)) {
        special_chars.push(y);
      }
    }
  }

  for (let y = 0; y < inputs.length; y++) {
    let temp = "";
    let eligible = false;

    for (let x = 0; x <= inputs[y].length; x++) {
      if (!isNaN(inputs[y][x])) {
        temp += inputs[y][x];
        if (!eligible) {
          if (y != 0 && x != 0 && special_chars.includes(inputs[y - 1][x - 1]))
            eligible = true;
          if (x != 0 && special_chars.includes(inputs[y][x - 1]))
            eligible = true;
          if (
            y != 139 &&
            x != 0 &&
            special_chars.includes(inputs[y + 1][x - 1])
          )
            eligible = true;
          if (y != 0 && special_chars.includes(inputs[y - 1][x]))
            eligible = true;
          if (y != 139 && special_chars.includes(inputs[y + 1][x]))
            eligible = true;
          if (
            y != 0 &&
            x != 139 &&
            special_chars.includes(inputs[y - 1][x + 1])
          )
            eligible = true;
          if (x != 139 && special_chars.includes(inputs[y][x + 1]))
            eligible = true;
          if (
            y != 139 &&
            x != 139 &&
            special_chars.includes(inputs[y + 1][x + 1])
          )
            eligible = true;
        }
      }
      if (isNaN(inputs[y][x]) && temp != "") {
        if (eligible) {
          answer += Number(temp);
          for (let i = 1; i <= temp.length; i++)
            pc_part2[y + "_" + (x - i)] = Number(temp);
        }
        temp = "";
        eligible = false;
      }
    }
  }
  return answer;
}

//PART 2
function part2() {
  let good_stars = [];
  for (let y = 0; y < inputs.length; y++) {
    //iterate over each character
    for (let x = 0; x <= inputs[y].length; x++) {
      //ENSURE THAT WE'RE NOT COUNTING THE SAME NUMBER TWICE
      let tl = false;
      let t = false;
      let tr = false;
      let bl = false;
      let b = false;
      let br = false;
      let i = 0;
      let arr = [];
      //if character is a star
      if (inputs[y][x] == "*") {
        //check if a number is closeby
        //left
        if (x != 0 && !isNaN(inputs[y][x - 1])) arr.push("l");
        //right
        if (x != 139 && !isNaN(inputs[y][x + 1])) arr.push("r");
        //top-left
        if (y != 0 && x != 0 && !isNaN(inputs[y - 1][x - 1])) tl = true;
        //top
        if (y != 0 && !isNaN(inputs[y - 1][x])) t = true;
        //top-right
        if (y != 0 && x != 139 && !isNaN(inputs[y - 1][x + 1])) tr = true;
        //if only corners are true, then there are 2 adjacent numbers
        if (tl && !t) arr.push("tl");
        if (t) arr.push("t");
        if (tr && !t) arr.push("tr");
        //bottom-left
        if (y != 139 && x != 0 && !isNaN(inputs[y + 1][x - 1])) bl = true;
        //bottom
        if (y != 139 && !isNaN(inputs[y + 1][x])) b = true;
        //bottom-right
        if (y != 139 && x != 139 && !isNaN(inputs[y + 1][x + 1])) br = true;
        //if only corners are true, then there are 2 adjacent numbers
        if (bl && !b) arr.push("bl");
        if (b) arr.push("b");
        if (br && !b) arr.push("br");
      }
      if (arr.length == 2) {
        //add number to answer if eligible
        good_stars.push([y, x, arr]);
      }
    }
  }

  //check neighbors of each good star
  good_stars.forEach((gs) => {
    let local_answer = 1;

    //calc product
    gs[2].forEach((pos) => {
      switch (pos) {
        case "l":
          local_answer *= pc_part2[gs[0] + "_" + (gs[1] - 1)];
          break;
        case "r":
          local_answer *= pc_part2[gs[0] + "_" + (gs[1] + 1)];
          break;
        case "tl":
          local_answer *= pc_part2[gs[0] - 1 + "_" + (gs[1] - 1)];
          break;
        case "t":
          local_answer *= pc_part2[gs[0] - 1 + "_" + gs[1]];
          break;
        case "tr":
          local_answer *= pc_part2[gs[0] - 1 + "_" + (gs[1] + 1)];
          break;
        case "bl":
          local_answer *= pc_part2[gs[0] + 1 + "_" + (gs[1] - 1)];
          break;
        case "b":
          local_answer *= pc_part2[gs[0] + 1 + "_" + gs[1]];
          break;
        case "br":
          local_answer *= pc_part2[gs[0] + 1 + "_" + (gs[1] + 1)];
          break;
      }
    });
    //add to answer
    answer_p2 += local_answer;
  });
  return answer_p2;
}

//print results
console.log(part1());
console.log(part2());
