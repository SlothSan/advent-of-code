let input = `Valve BT has flow rate=0; tunnels lead to valves EZ, TO
Valve OJ has flow rate=0; tunnels lead to valves UV, QG
Valve SQ has flow rate=0; tunnels lead to valves IR, KE
Valve JT has flow rate=9; tunnels lead to valves ES, RL, BL, BN
Valve PH has flow rate=20; tunnels lead to valves IL, CA, RL, QD
Valve YI has flow rate=0; tunnels lead to valves IL, IF
Valve BU has flow rate=0; tunnels lead to valves IR, BL
Valve IR has flow rate=13; tunnels lead to valves HV, CA, BU, MA, SQ
Valve SV has flow rate=16; tunnels lead to valves NL, MA, XQ
Valve JG has flow rate=0; tunnels lead to valves JL, AA
Valve NL has flow rate=0; tunnels lead to valves SV, QD
Valve FS has flow rate=0; tunnels lead to valves KE, XQ
Valve UV has flow rate=19; tunnels lead to valves YB, OJ, YQ, CX
Valve MA has flow rate=0; tunnels lead to valves SV, IR
Valve YB has flow rate=0; tunnels lead to valves UV, TG
Valve YQ has flow rate=0; tunnels lead to valves UV, RN
Valve EZ has flow rate=8; tunnels lead to valves BT, EU, VJ, PJ, HX
Valve EU has flow rate=0; tunnels lead to valves EZ, FC
Valve KE has flow rate=21; tunnels lead to valves ES, SQ, FS
Valve YW has flow rate=0; tunnels lead to valves QG, PJ
Valve PJ has flow rate=0; tunnels lead to valves YW, EZ
Valve OY has flow rate=11; tunnels lead to valves HX, JL, ZH, EH, JU
Valve CX has flow rate=0; tunnels lead to valves NT, UV
Valve HV has flow rate=0; tunnels lead to valves MO, IR
Valve EH has flow rate=0; tunnels lead to valves OY, GS
Valve NN has flow rate=23; tunnel leads to valve RM
Valve CP has flow rate=0; tunnels lead to valves FU, ZH
Valve FU has flow rate=14; tunnels lead to valves BF, CP
Valve BF has flow rate=0; tunnels lead to valves RM, FU
Valve RN has flow rate=0; tunnels lead to valves AA, YQ
Valve BN has flow rate=0; tunnels lead to valves TO, JT
Valve HX has flow rate=0; tunnels lead to valves EZ, OY
Valve JL has flow rate=0; tunnels lead to valves JG, OY
Valve KS has flow rate=0; tunnels lead to valves TO, AA
Valve JU has flow rate=0; tunnels lead to valves JJ, OY
Valve PA has flow rate=0; tunnels lead to valves QG, NH
Valve JJ has flow rate=0; tunnels lead to valves QG, JU
Valve IL has flow rate=0; tunnels lead to valves YI, PH
Valve ES has flow rate=0; tunnels lead to valves KE, JT
Valve TX has flow rate=0; tunnels lead to valves TO, QG
Valve GS has flow rate=0; tunnels lead to valves PT, EH
Valve QD has flow rate=0; tunnels lead to valves NL, PH
Valve TG has flow rate=0; tunnels lead to valves YB, FC
Valve BL has flow rate=0; tunnels lead to valves BU, JT
Valve ZH has flow rate=0; tunnels lead to valves OY, CP
Valve PT has flow rate=18; tunnel leads to valve GS
Valve CA has flow rate=0; tunnels lead to valves PH, IR
Valve IF has flow rate=25; tunnels lead to valves MO, YI
Valve NH has flow rate=0; tunnels lead to valves PA, AA
Valve TO has flow rate=3; tunnels lead to valves BT, NT, TX, BN, KS
Valve RL has flow rate=0; tunnels lead to valves PH, JT
Valve FC has flow rate=22; tunnels lead to valves TG, EU
Valve AA has flow rate=0; tunnels lead to valves RN, NH, VJ, JG, KS
Valve XQ has flow rate=0; tunnels lead to valves SV, FS
Valve QG has flow rate=5; tunnels lead to valves TX, JJ, PA, YW, OJ
Valve VJ has flow rate=0; tunnels lead to valves EZ, AA
Valve RM has flow rate=0; tunnels lead to valves NN, BF
Valve NT has flow rate=0; tunnels lead to valves TO, CX
Valve MO has flow rate=0; tunnels lead to valves IF, HV`;

// let nodes = input.split("\n").map((row, id) => {
//     let tmp = row.split(' ');
//     return {
//         id: id,
//         name: tmp[1],
//         rate: Number(tmp[4].match(/\d+/g)[0]),
//         connections: tmp.slice(tmp.indexOf('to')+2).map(v => v.substr(0, 2))
//     }
// })
//
// const nodeByName = name => nodes.filter(n => n.name == name)[0];
//
// const distanceMap = (startName, distances = {}) => {
//     const spread = (name, steps) => {
//         if (distances[name] != undefined && distances[name] <= steps) return;
//         distances[name] = steps;
//         nodeByName(name).connections.map(n => spread(n, steps+1));
//     }
//
//     spread(startName, 0);
//
//     return distances;
// }
//
// const activeNodes = () => nodes.filter(n => n.rate > 0)/*.sort((a, b) => {
//     return (timeLeft-distances[b.name]-1)*b.rate - (timeLeft-distances[a.name]-1)*a.rate
// })*/;
//
// let currentNode = 'AA', timeLeft = 30;
//
// console.log(nodes);
//
// let distances = distanceMap(currentNode);
// console.log(distances);
//
// console.log(activeNodes().sort((a, b) => {
//     return (timeLeft-distances[b.name]-1)*b.rate - (timeLeft-distances[a.name]-1)*a.rate
// }))
//
// let paths = [{curr: 'AA', active: activeNodes().map(n => n.name), timeLeft: 30, finished: false, steps: [], releasedPressure: 0}]
//
// let max = 0;
//
// for (let n = 0; n < paths.length; n++) {
//     let path = paths[n];
//     if (path.timeLeft <= 0) path.finished = true;
//     if (path.finished) continue;
//
//     let distances = distanceMap(path.curr), moved = false;
//     path.active.forEach(act => {
//         if (act == path.curr) return true;
//         if (path.timeLeft-distances[act] <= 1) return true;
//         moved = true;
//         paths.push({
//             curr: act,
//             active: path.active.filter(v => v != act)/*.sort((na, nb) => {
//                 let a = nodeByName(na), b = nodeByName(nb);
//                 return (path.timeLeft-distances[b.name]-1)*b.rate - (path.timeLeft-distances[a.name]-1)*a.rate
//             })*/,
//             timeLeft: path.timeLeft-distances[act]-1,
//             finished: false,
//             steps: [...path.steps, act],
//             releasedPressure: path.releasedPressure + (path.timeLeft-distances[act]-1)*nodeByName(act).rate
//         })
//     })
//     if (!moved) path.finished = true;
//     if (path.finished && path.releasedPressure > max) {
//         console.log('we have a new max', path.releasedPressure);
//         max = path.releasedPressure;
//     }
// }
//
// console.log(paths.filter(p => p.finished).sort((a, b) => b.releasedPressure-a.releasedPressure));

let nodes = input.split("\n").map((row, id) => {
    let tmp = row.split(' ');
    return {
        id: id,
        name: tmp[1],
        rate: Number(tmp[4].match(/\d+/g)[0]),
        connections: tmp.slice(tmp.indexOf('to')+2).map(v => v.substr(0, 2))
    }
})

let nodeByName = {};

nodes.map((n, i) => nodeByName[n.name] = n);

const activeNodes = () => nodes.filter(n => n.rate > 0)
const duos = (a, res = []) => {
    for (let i = 0; i < a.length; i++) for (let j = 0; j<a.length; j++) if (i != j) res.push([a[i], a[j]]);
    return res
}

const sortDuos = (duos, d1, d2, t1, t2) => {
    const valueFromDuo = ([target1, target2]) => (t1-d1[target1]-1)*nodeByName[target1].rate + (t2-d2[target2]-1)*nodeByName[target2].rate
    return duos.sort((duo1, duo2) => valueFromDuo(duo1) - valueFromDuo(duo2))
}

const distanceMap = (startName, distances = {}) => {
    if (nodeByName[startName].distanceMap) return nodeByName[startName].distanceMap;
    const spread = (name, steps) => {
        if (distances[name] != undefined && distances[name] <= steps) return;
        distances[name] = steps;
        nodeByName[name].connections.forEach(n => spread(n, steps+1));
    }
    spread(startName, 0);
    nodeByName[startName].distanceMap = distances;
    return distances;
}

console.log(nodes);

let paths = [{curr1: 'AA', curr2: 'AA', active: activeNodes().map(n => n.name), timeLeft1: 26, timeLeft2: 26, finished: false, finished1: false, finished2: false, /*steps1: [], steps2: [], */releasedPressure: 0}]

let max = 0, i = 0;

while (paths.length) {
    let path = paths.pop();

    if (path.finished) continue;

    let distances1 = distanceMap(path.curr1),
        distances2 = distanceMap(path.curr2),
        moved1 = false, moved2 = false, moved = false;

    let nextStepDuos = duos(path.active.filter(v => v != path.curr1 && v != path.curr2));

    nextStepDuos = sortDuos(nextStepDuos, distances1, distances2, path.timeLeft1, path.timeLeft2)

    nextStepDuos.forEach(([act1, act2]) => {
        if (path.timeLeft1-distances1[act1] > 1) moved1 = true;
        if (path.timeLeft2-distances2[act2] > 1) moved2 = true;
        moved = moved1 || moved2;
        let tmp = {
            finished: false, finished1: false, finished2: false,
            active: path.active.filter(v => v != act1 && v != act2),
            releasedPressure: path.releasedPressure
        };

        if (moved1 && !path.finished1) {
            tmp.curr1 = act1;
            tmp.timeLeft1 = path.timeLeft1-distances1[act1]-1;
            tmp.releasedPressure += (path.timeLeft1-distances1[act1]-1)*nodeByName[act1].rate;
        } else {
            tmp.curr1 = path.curr1;
            tmp.timeLeft1 = path.timeLeft1;
            tmp.finished1 = true;
        }

        if (moved2 && !path.finished2) {
            tmp.curr2 = act2;
            tmp.timeLeft2 = path.timeLeft2-distances2[act2]-1;
            tmp.releasedPressure += (path.timeLeft2-distances2[act2]-1)*nodeByName[act2].rate;
        } else {
            tmp.curr2 = path.curr2;
            tmp.timeLeft2 = path.timeLeft2;
            tmp.finished2 = true;
        }

        paths.push(tmp);
    })
    if (!moved) path.finished = true;
    if (path.finished && path.releasedPressure > max) {
        console.log('we have a new max', path.releasedPressure/*, path.steps1.join(', '), ' | ', path.steps2.join(', ')*/, path);
        max = path.releasedPressure;
    }
    i++;
    if (i % 100000000 == 0) console.log('still on it', i/10000000);
    if (i > 60000000000) {console.log('em break'); break}
}

console.log(paths.filter(p => p.finished).sort((a, b) => b.releasedPressure-a.releasedPressure));
