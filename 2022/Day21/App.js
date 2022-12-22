const fs = require("fs");

const monkeyMap = new Map();

fs.readFileSync( "./input.txt", "utf8")
    .toString()
    .trim()
    .split("\n")
    .map((line) => {
        let split = line.split(": ");
        let monkey = split[0];
        let job = split[1].split(" ");
        if (job.length > 1) {
            let operand1 = job[0];
            let operator = job[1];
            let operand2 = job[2];
            monkeyMap.set(monkey, {
                type: "operation",
                operand1,
                operator,
                operand2,
            });
        } else {
            let number = parseInt(job[0]);
            monkeyMap.set(monkey, {
                type: "number",
                number,
            });
        }
    });




// const evaluate = (monkey) => {
//     let job = monkeyMap.get(monkey);
//
//     if (job.type === "number") return job.number;
//
//     let operand1 = evaluate(job.operand1);
//     let operand2 = evaluate(job.operand2);
//
//     if (job.operator === "+") return operand1 + operand2;
//     if (job.operator === "-") return operand1 - operand2;
//     if (job.operator === "*") return operand1 * operand2;
//     if (job.operator === "/") return operand1 / operand2;
// };

// console.log(evaluate("root"));

const evaluate = (monkey) => {
    let job = monkeyMap.get(monkey);

    if (job.type === "number") return job.number;

    let operand1 = evaluate(job.operand1);
    let operand2 = evaluate(job.operand2);

    if (job.operator === "+") return operand1 + operand2;
    if (job.operator === "-") return operand1 - operand2;
    if (job.operator === "*") return operand1 * operand2;
    if (job.operator === "/") return operand1 / operand2;
};

const usesHumanYell = (monkey) => {
    let job = monkeyMap.get(monkey);
    if (job.type === "number") return false;
    if (job.operand1 === "humn") return true;
    if (job.operand2 === "humn") return true;
    return usesHumanYell(job.operand1) || usesHumanYell(job.operand2);
};

// Find which operand is affected by the human yell
let rootJob = monkeyMap.get("root");
let target;
let humanAffectedOperand;

if (!usesHumanYell(rootJob.operand1)) {
    target = evaluate(rootJob.operand1);
    humanAffectedOperand = rootJob.operand2;
} else {
    target = evaluate(rootJob.operand2);
    humanAffectedOperand = rootJob.operand1;
}

// Find the correlation of the human yell to the affected operand
monkeyMap.set("humn", {
    type: "number",
    number: 0,
});
let evaluated = evaluate(humanAffectedOperand);
monkeyMap.set("humn", {
    type: "number",
    number: 1,
});
let evaluated2 = evaluate(humanAffectedOperand);
let correlation = evaluated < evaluated2 ? 1 : -1;

// Find the number that will make the human yell equal to the target
let increment = 100000000000000;
let currNum = 0;
let wasUnderTarget = true;
while (evaluate(humanAffectedOperand) !== target) {
    let evaluated = evaluate(humanAffectedOperand);

    if (evaluated > target) {
        if (wasUnderTarget) increment /= 10;
        wasUnderTarget = false;
        currNum -= increment * correlation;
    }
    if (evaluated < target) {
        if (!wasUnderTarget) increment /= 10;
        wasUnderTarget = true;
        currNum += increment * correlation;
    }

    monkeyMap.set("humn", {
        type: "number",
        number: currNum,
    });
}

console.log(monkeyMap.get("humn").number);
