import run from "aocrunner";

interface Node {
  edges: string[]
}

type Graph = Record<string, Node>
type Solution = string[]

const clone = (a: object) => JSON.parse(JSON.stringify(a));

const parseInput = (rawInput: string): Graph => {
  const lines = rawInput.split('\n');
  const graph = {} as Graph
  lines.forEach(l => {
    const [_, n1, n2] = l.match(/(\w+)-(\w+)/) ?? ['barkin', 'barkin', 'barkin']
    if (!graph[n1]) {
      graph[n1] = { edges: [] }
    }
    if (!graph[n2]) {
      graph[n2] = { edges: [] }
    }
    graph[n1].edges.push(n2)
    graph[n2].edges.push(n1)
  })
  return graph
}

const part1 = (rawInput: string) => {
  const graph = parseInput(rawInput);
  
  const allSolutions: Solution[] = []

  // A solution is a string[]
  const solve = (g: Graph, cur: string, soFar: Solution) => {
    // console.log(g, cur, soFar)
    if (cur === 'end') {
      allSolutions.push(soFar.concat(['end']) as Solution)
      return
    }

    const nextGraph = clone(g)
    // console.log('NG cur', cur, nextGraph[cur])
    const edges = nextGraph[cur].edges.slice(0)
    if (cur.match(/[a-z]+/)) {
      delete nextGraph[cur]
    }
    
    edges.forEach((e: string) => {
      if (nextGraph[e]) {
        solve(nextGraph, e, soFar.concat(e))
      }
    })
  }

  solve(graph, 'start', [])
  // console.log(allSolutions)
  return allSolutions.length;
};

const part2 = (rawInput: string) => {
  const graph = parseInput(rawInput);
  
  const allSolutions = new Set<string>()

  // A solution is a string[]
  const solve = (g: Graph, cur: string, soFar: Solution, single: boolean) => {
    if (cur === 'end') {
      allSolutions.add(soFar.join(','))
      return
    } 
    // console.log(soFar.join(','), single, '\n\n')
    const nextGraph = clone(g)
    // console.log('NG cur', cur, nextGraph[cur])
    const edges = nextGraph[cur].edges.slice(0)

    // At this point, we either consider this to "visit" again, or it's already visited and we skip
    if (cur === 'start') {
      delete nextGraph[cur]
      edges.forEach((e: string) => {
        if (nextGraph[e]) {
          solve(nextGraph, e, soFar.concat(e), single)
        }
      })
    }
    else if (cur.match(/[a-z]+/)) {
      if (!single) {
        // Consider this our 'double'
        edges.forEach((e: string) => {
          if (nextGraph[e]) {
            solve(nextGraph, e, soFar.concat(e), true)
          }
        })
      }

      const culledGraph = clone(g)
      delete culledGraph[cur]
      edges.forEach((e: string) => {
        if (culledGraph[e]) {
          solve(culledGraph, e, soFar.concat(e), single)
        }
      })

    } else {
      edges.forEach((e: string) => {
        if (nextGraph[e]) {
          solve(nextGraph, e, soFar.concat(e), single)
        }
      })
    }
  }

  solve(graph, 'start', ['start'], false)
  
  return allSolutions.size;
};

run({
  part1: {
    tests: [
      { input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`, expected: 10 },
      { input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`, expected: 19 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`, expected: 36 },
//       { input: `dc-end
// HN-start
// start-kj
// dc-start
// dc-HN
// LN-dc
// HN-end
// kj-sa
// kj-HN
// kj-dc`, expected: 103},
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
