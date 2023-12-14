const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .split("\n");

const part1Solution = (input) => {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const game = line
      .split(": ")[1]
      .split("; ")
      .map((x) => {
        const result = {
          red: 0,
          green: 0,
          blue: 0,
        };
        const objects = x.split(", ");
        for (const object of objects) {
          if (object.endsWith("red"))
            result.red = parseInt(object.split(" ")[0]);
          if (object.endsWith("green"))
            result.green = parseInt(object.split(" ")[0]);
          if (object.endsWith("blue"))
            result.blue = parseInt(object.split(" ")[0]);
        }

        return result;
      });
    const redMax = Math.max(...game.map((x) => x.red));
    const greenMax = Math.max(...game.map((x) => x.green));
    const blueMax = Math.max(...game.map((x) => x.blue));
    if (redMax <= 12 && greenMax <= 13 && blueMax <= 14) result += i + 1;
  }
  return result;
};

const part2Solution = (input) => {
  const possibleGames = input.reduce((possibleGames, line) => {
    const roundMatches = line
      .substring(line.indexOf(":") + 1, line.length)
      .split(";")
      .map((r) => r.match(/\s(\d+\s[a-z]+)/g))
      .map((arr) => arr.map((s) => s.trimStart().split(/\s/)));
    const game = {
      id: parseInt(line.match(/^Game\s(\d+):\s/)[1]),
      rounds: roundMatches.map((r, i) =>
        r.map((sr) => {
          return {
            cubes: parseInt(sr[0]),
            color: sr[1],
          };
        })
      ),
    };
    let gameFewestNumOfCubesPerColor = {
      red: 0,
      green: 0,
      blue: 0,
    };
    game.rounds.forEach((r) => {
      r.forEach((sr) => {
        if (sr.color == "red") {
          if (sr.cubes > gameFewestNumOfCubesPerColor.red)
            gameFewestNumOfCubesPerColor.red = sr.cubes;
        } else if (sr.color == "green") {
          if (sr.cubes > gameFewestNumOfCubesPerColor.green)
            gameFewestNumOfCubesPerColor.green = sr.cubes;
        } else {
          if (sr.cubes > gameFewestNumOfCubesPerColor.blue)
            gameFewestNumOfCubesPerColor.blue = sr.cubes;
        }
      });
    });
    possibleGames.push(gameFewestNumOfCubesPerColor);
    return possibleGames;
  }, []);
  const powerSum = possibleGames.reduce(
    (sum, cubeSet) =>
      sum + Object.values(cubeSet).reduce((prd, c) => prd * c, 1),
    0
  );
  return powerSum;
};

console.log(part1Solution(input));
console.log(part2Solution(input));
