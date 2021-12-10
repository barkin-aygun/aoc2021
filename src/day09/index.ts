import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.split('').map(x => parseInt(x, 10)));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let res = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const depth = input[i][j]
      
      if ((i > 0 && input[i - 1][j] <= depth) ||
        ((i < (input.length - 1)) && input[i + 1][j] <= depth) ||
        (j > 0 && input[i][j - 1] <= depth) ||
        ((j < (input[0].length - 1)) && input[i][j + 1] <= depth)) {
        continue
      }
      res += depth + 1
    }
  }
  return res
};

const basinSize = (input: number[][], i: number, j: number): number => {
  const visited = new Set<string>()
  const toVisit = [[i,j]]
  
  while (toVisit.length > 0) {
    const [x,y] = toVisit.shift() as number[]
    const key = x + ',' + y

    if (visited.has(key)) {
      continue
    }
    visited.add(key)

    if (x > 0 && input[x - 1][y] !== 9) {
      toVisit.push([x - 1, y])
    }

    if (x < input.length - 1 && input[x + 1][y] !== 9) {
      toVisit.push([x+1,y])
    }

    if (y > 0 && input[x][y-1] !== 9) {
      toVisit.push([x,y-1])
    }

    if (y < input[0].length - 1 && input[x][y+1] !== 9) {
      toVisit.push([x,y+1])
    }
  }
  
  return visited.size;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let res = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const depth = input[i][j]
      
      if ((i > 0 && input[i - 1][j] <= depth) ||
        ((i < (input.length - 1)) && input[i + 1][j] <= depth) ||
        (j > 0 && input[i][j - 1] <= depth) ||
        ((j < (input[0].length - 1)) && input[i][j + 1] <= depth)) {
        continue
      }
      
      // Found a basin! Now expand from it to calculate area of basin
      res.push(basinSize(input, i, j))
    }
  }
  res.sort((x,y) => y - x)
  return res[0] * res[1] * res[2]
};

run({
  part1: {
    tests: [
      { input: `2199943210
3987894921
9856789892
8767896789
9899965678`, expected: 15 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `2199943210
3987894921
9856789892
8767896789
9899965678`, expected: 1134 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
