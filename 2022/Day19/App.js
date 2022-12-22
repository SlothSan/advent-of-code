"use strict";
const { readFileSync, promises: fsPromises } = require("fs");
// type Blueprint = {
//     id: number,
//     oreRobotCost: RobotCost,
//     clayRobotCost: RobotCost,
//     obsidianRobotCost: RobotCost,
//     geodeRobotCost: RobotCost
// }
//
// type RobotCost = {
//     ore: number,
//     clay: number,
//     obsidian: number
// }
//
// type RobotsCount = {
//     ore: number,
//     clay: number,
//     obsidian: number
// }
//
// type MaterialsCount = {
//     ores: number,
//     clays: number,
//     obsidians: number,
//     geodes: number
// }
//
// const sum = (a: number, b: number): number => a + b;
// const getMaxGeodes = (time: number, robots: RobotsCount, materials: MaterialsCount, currMaxGeodes: number, blueprint: Blueprint): number => {
//     if (time <= 0)
//         return currMaxGeodes;
//
//     currMaxGeodes = Math.max(materials.geodes, currMaxGeodes);
//
//     const maxOreNeeded = Math.max(
//         blueprint.oreRobotCost.ore,
//         blueprint.clayRobotCost.ore,
//         blueprint.obsidianRobotCost.ore,
//         blueprint.geodeRobotCost.ore
//     );
//
//     if (robots.obsidian > 0) {
//         const enoughOre = blueprint.geodeRobotCost.ore <= materials.ores;
//         const enoughObsidian = blueprint.geodeRobotCost.obsidian <= materials.obsidians;
//         const canBuildGeodeRobot = enoughOre && enoughObsidian;
//
//         const timeUntilEnoughOre = Math.ceil((blueprint.geodeRobotCost.ore - materials.ores) / robots.ore);
//         const timeUntilEnoughObsidian = Math.ceil((blueprint.geodeRobotCost.obsidian - materials.obsidians) / robots.obsidian);
//         const timeUntilEnoughResources = Math.max(timeUntilEnoughOre, timeUntilEnoughObsidian);
//
//         const totalTime = 1 + (canBuildGeodeRobot ? 0 : timeUntilEnoughResources);
//
//         const newMaterials = {
//             ...materials,
//             ores: materials.ores + totalTime * robots.ore - blueprint.geodeRobotCost.ore,
//             clays: materials.clays + totalTime * robots.clay,
//             obsidians: materials.obsidians + totalTime * robots.obsidian - blueprint.geodeRobotCost.obsidian,
//             geodes: materials.geodes + time - totalTime
//         };
//
//         currMaxGeodes = Math.max(getMaxGeodes(time - totalTime, robots, newMaterials, currMaxGeodes, blueprint), currMaxGeodes);
//
//         if (canBuildGeodeRobot)
//             return currMaxGeodes;
//     }
//
//     if (robots.clay > 0) {
//         const enoughOre = blueprint.obsidianRobotCost.ore <= materials.ores;
//         const enoughClay = blueprint.obsidianRobotCost.clay <= materials.clays;
//         const canBuildObsidianRobot = enoughOre && enoughClay;
//
//         const timeUntilEnoughOre = Math.ceil((blueprint.obsidianRobotCost.ore - materials.ores) / robots.ore);
//         const timeUntilEnoughClay = Math.ceil((blueprint.obsidianRobotCost.clay - materials.clays) / robots.clay);
//         const timeUntilEnoughResources = Math.max(timeUntilEnoughOre, timeUntilEnoughClay);
//
//         const totalTime = 1 + (canBuildObsidianRobot ? 0 : timeUntilEnoughResources);
//
//         if (time - totalTime > 2) {
//
//             const newRobots = {
//                 ...robots,
//                 obsidian: robots.obsidian + 1
//             };
//
//             const newMaterials = {
//                 ...materials,
//                 ores: materials.ores + totalTime * robots.ore - blueprint.obsidianRobotCost.ore,
//                 clays: materials.clays + totalTime * robots.clay - blueprint.obsidianRobotCost.clay,
//                 obsidians: materials.obsidians + totalTime * robots.obsidian
//             };
//
//             currMaxGeodes = Math.max(getMaxGeodes(time - totalTime, newRobots, newMaterials, currMaxGeodes, blueprint));
//         }
//     }
//
//     if (robots.clay < blueprint.obsidianRobotCost.clay) {
//         const canBuildClayRobot = blueprint.clayRobotCost.ore <= materials.ores;
//
//         const timeUntilEnoughOre = Math.ceil((blueprint.clayRobotCost.ore - materials.ores) / robots.ore);
//
//         const totalTime = 1 + (canBuildClayRobot ? 0 : timeUntilEnoughOre);
//
//         if (time - totalTime > 3) {
//
//             const newRobots = {
//                 ...robots,
//                 clay: robots.clay + 1
//             };
//
//             const newMaterials = {
//                 ...materials,
//                 ores: materials.ores + totalTime * robots.ore - blueprint.clayRobotCost.ore,
//                 clays: materials.clays + totalTime * robots.clay,
//                 obsidians: materials.obsidians + totalTime * robots.obsidian
//             };
//
//             currMaxGeodes = Math.max(getMaxGeodes(time - totalTime, newRobots, newMaterials, currMaxGeodes, blueprint));
//         }
//     }
//
//     if (robots.ore < maxOreNeeded) {
//         const canBuildOreRobot = blueprint.oreRobotCost.ore <= materials.ores;
//
//         const timeUntilEnoughOre = Math.ceil((blueprint.oreRobotCost.ore - materials.ores) / robots.ore);
//
//         const totalTime = 1 + (canBuildOreRobot ? 0 : timeUntilEnoughOre);
//
//         if (time - totalTime > 4) {
//
//             const newRobots = {
//                 ...robots,
//                 ore: robots.ore + 1
//             };
//
//             const newMaterials = {
//                 ...materials,
//                 ores: materials.ores + totalTime * robots.ore - blueprint.oreRobotCost.ore,
//                 clays: materials.clays + totalTime * robots.clay,
//                 obsidians: materials.obsidians + totalTime * robots.obsidian
//             };
//
//             currMaxGeodes = Math.max(getMaxGeodes(time - totalTime, newRobots, newMaterials, currMaxGeodes, blueprint));
//         }
//     }
//
//     return currMaxGeodes;
// };
//
// const input = readFileSync('./input.txt', 'utf8')
//     .split('\n')
//     .filter(l => l.length > 0);
//
// const blueprints: Blueprint[] = input.map(line => {
//     const regex = /\d+/g;
//     const id = Number(regex.exec(line));
//     const oreRobotCost = {
//         ore: Number(regex.exec(line)),
//         clay: 0,
//         obsidian: 0
//     } as RobotCost;
//     const clayRobotCost = {
//         ore: Number(regex.exec(line)),
//         clay: 0,
//         obsidian: 0
//     } as RobotCost;
//     const obsidianRobotCost = {
//         ore: Number(regex.exec(line)),
//         clay: Number(regex.exec(line)),
//         obsidian: 0
//     } as RobotCost;
//     const geodeRobotCost = {
//         ore: Number(regex.exec(line)),
//         clay: 0,
//         obsidian: Number(regex.exec(line)),
//     } as RobotCost;
//     return {
//         id,
//         oreRobotCost,
//         clayRobotCost,
//         obsidianRobotCost,
//         geodeRobotCost
//     } as Blueprint;
// });
//
// const initialRobots: RobotsCount = {
//     ore: 1,
//     clay: 0,
//     obsidian: 0
// };
//
// const initialMaterials: MaterialsCount = {
//     ores: 0,
//     clays: 0,
//     obsidians: 0,
//     geodes: 0
// };
//
// const qualities = blueprints.map(blueprint => getMaxGeodes(24, initialRobots, initialMaterials, 0, blueprint) * blueprint.id);
//
// const answer = qualities.reduce(sum);
//
// console.log(answer);
class Node {
    constructor(value) {
        this.value = value * 811589153;
        this.next = this;
        this.prev = this;
        this.origNext = this;
    }
}
const sum = (a, b) => a + b;
const getZeroNode = (start) => {
    let curr = start;
    while (curr.value != 0)
        curr = curr.next;
    return curr;
};
const getNthValue = (start, offset) => {
    let curr = start;
    for (let i = 0; i < offset; i++) {
        curr = curr.next;
    }
    return curr.value;
};
const mixList = (start) => {
    let curr = start;
    do {
        if (curr.value === 0) {
            curr = curr.origNext;
            continue;
        }
        curr.prev.next = curr.next;
        curr.next.prev = curr.prev;
        let newPrev = curr;
        for (let i = 0; i < ((Math.abs(curr.value) % (input.length - 1))); i++) {
            if (curr.value < 0)
                newPrev = newPrev.prev;
            else
                newPrev = newPrev.next;
        }
        if (curr.value < 0)
            newPrev = newPrev.prev;
        curr.next = newPrev.next;
        curr.prev = newPrev;
        curr.next.prev = curr;
        curr.prev.next = curr;
        curr = curr.origNext;
    } while (curr != start);
};
const input = readFileSync('./input.txt', 'utf8')
    .split('\n')
    .filter(l => l.length > 0)
    .map(Number);
const nodes = input.map(val => new Node(val));
for (let i = 1; i < input.length; i++) {
    nodes[i - 1].next = nodes[i];
    nodes[i - 1].origNext = nodes[i];
    nodes[i].prev = nodes[i - 1];
}
nodes[0].prev = nodes[input.length - 1];
nodes[input.length - 1].next = nodes[0];
nodes[input.length - 1].origNext = nodes[0];
const listStart = nodes[0];
for (let i = 0; i < 10; i++)
    mixList(listStart);
const zero = getZeroNode(listStart);
const answer = [
    getNthValue(zero, 1000),
    getNthValue(zero, 2000),
    getNthValue(zero, 3000),
].reduce(sum);
console.log(answer);
