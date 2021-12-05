import run from "aocrunner";

type Line = {
  x1: number,
  y1: number,
  x2: number,
  y2: number
}
const parseInput = (rawInput: string) => rawInput.split('\n').map(line => {
  const m = line.match(/(\d+),(\d+) -> (\d+),(\d+)/)
  if (m) {
    return {
      x1: +m[1],
      y1: +m[2],
      x2: +m[3],
      y2: +m[4]
    } as Line
  } else {
    throw new Error("Invalid line:" + line)
  }
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const grid = [] as number[][]

  input.forEach(({x1,y1,x2,y2}) => {
    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i <= Math.max(y1,y2); i++) {
        if (grid[i] === undefined) {
          grid[i] = [];
        }
        grid[i][x1] = (grid[i][x1] ?? 0) + 1
      }
    }
    if (y1 === y2) {
      if (grid[y1] === undefined) {
        grid[y1] = [];
      }
      for (let i = Math.min(x1, x2); i <= Math.max(x1,x2); i++) {
        grid[y1][i] = (grid[y1][i] ?? 0) + 1
      }
    }
  })
  return grid.reduce((total, line) => total + line.reduce((st, c) => st + (c >= 2 ? 1 : 0), 0), 0)
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const grid = [] as number[][]

  input.forEach(({x1,y1,x2,y2}) => {
    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i <= Math.max(y1,y2); i++) {
        if (grid[i] === undefined) {
          grid[i] = [];
        }
        grid[i][x1] = (grid[i][x1] ?? 0) + 1
      }
    }
    else if (y1 === y2) {
      if (grid[y1] === undefined) {
        grid[y1] = [];
      }
      for (let i = Math.min(x1, x2); i <= Math.max(x1,x2); i++) {
        grid[y1][i] = (grid[y1][i] ?? 0) + 1
      }
    } else if (Math.abs(x2 - x1) === Math.abs(y2 - y1)) {
// If y1 is smaller, we're going from y1 to y2, so should go from x1 to x2
      let j, jd;

      if (y1 < y2) {
        j = x1
        jd = x1 < x2 ? 1 : -1
      } else {
        j = x2
        jd = x2 < x1 ? 1 : -1
      }
      
      for (let i = Math.min(y1, y2); i <= Math.max(y1,y2); i++) {
        if (grid[i] === undefined) {
          grid[i] = [];
        }
        grid[i][ j ] = (grid[i][ j ] ?? 0) + 1
        j += jd
      }
    }
  })
  return grid.reduce((total, line) => total + line.reduce((st, c) => st + (c >= 2 ? 1 : 0), 0), 0)
};

run({
  part1: {
    tests: [
      { input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`, expected: 5 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`, expected: 12 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
