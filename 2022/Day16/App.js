function maxPressureReleased (input, startTime) {
    const score = search(input, startTime)
    return score[0][1]
}

function maxPressureReleased2 (input, startTime) {
    const score = search(input, startTime)
    let max = 0
    for (let j = 1; j < score.length; j++) {
        for (let i = 0; i < j; i++) {
            if (score[i][1] * 2 < max) break
            const hashA = score[i][0]
            const hashB = score[j][0]
            if (hashA & hashB) continue
            const total = score[i][1] + score[j][1]
            if (total > max) max = total
        }
    }
    return max
}

function search (input, startTime) {
    const valves = getValves(input)
    const openable = input.filter(row => row.rate > 0)
    const shortestPath = getShortestPath(valves, openable)

    const score = []
    const unvisited = []
    unvisited.push([0, 'AA', startTime, 0])

    while (unvisited.length > 0) {
        const [visited, next, time, released, extras] = unvisited.pop()
        openable.forEach(row => {
            if (visited & row.hash) return
            score.push([visited, released])
            const distance = shortestPath[next][row.from]
            const nextTime = time - distance - 1
            if (nextTime > 0) {
                unvisited.push([
                    visited + row.hash,
                    row.from,
                    nextTime,
                    released + nextTime * row.rate,
                    extras
                ])
            }
        })
    }

    return score.sort((a, b) => b[1] - a[1])
}

function getShortestPath (valves, openable) {
    function findShortestPath (start) {
        const visited = {}
        const unvisited = []
        unvisited.push([valves[start], 0])
        while (unvisited.length > 0) {
            const [next, steps] = unvisited.shift()
            if (next.from in visited) {
                if (steps >= visited[next.from]) continue
                else visited[next.from] = steps
            } else {
                visited[next.from] = steps
            }
            Object.keys(next.to).forEach(id =>
                unvisited.push([valves[id], steps + next.to[id]])
            )
        }
        delete visited[start]
        return visited
    }

    const shortest = {}
    shortest.AA = findShortestPath('AA')
    openable.forEach(row => {
        shortest[row.from] = findShortestPath(row.from)
    })
    return shortest
}

function getValves (input) {
    const valves = {}
    let hash = 1
    input.forEach(row => {
        valves[row.from] = row
        if (row.rate > 0) {
            row.hash = hash
            hash *= 2
        }
    })

    function preprocessInputRowTo (row, path = []) {
        if (!Array.isArray(row.to)) return row.to
        const to = {}
        row.to.forEach(id => {
            if (path.includes(id)) return
            const next = valves[id]
            const steps =
                next.rate > 0
                    ? { [id]: 0 }
                    : preprocessInputRowTo(next, [...path, row.from])
            Object.keys(steps).forEach(id => {
                if (id in to) to[id] = Math.min(to[id], steps[id] + 1)
                else to[id] = steps[id] + 1
            })
        })
        delete to[row.from]
        return to
    }

    input.forEach(row => {
        row.to = preprocessInputRowTo(row)
    })

    return valves
}

function parse (line) {
    const matched = line.match(
        /^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)$/
    )
    return {
        from: matched[1],
        to: matched[3].split(', '),
        rate: +matched[2]
    }
}

const test = `
Valve BT has flow rate=0; tunnels lead to valves EZ, TO
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
Valve MO has flow rate=0; tunnels lead to valves IF, HV
`.trim().split('\n').map(parse)

console.log(maxPressureReleased(test, 30))
console.log(maxPressureReleased2(test, 26))
