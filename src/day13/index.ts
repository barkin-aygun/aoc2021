import run from "aocrunner";

interface Model {
  grid: number[][],
  instructions: string[],
  parsingNums: boolean,
  maxX: number,
  maxY: number
}
const logModel = (model: Model) => {
  for (let y = 0; y < model.maxY; y++) {
    let line = ''
    for (let x = 0; x < model.maxX; x++) {
      line += model.grid[y] ? (model.grid[y][x] ? '#' : '.') : '.'
    }
    console.log(line)
  }
}

const parseInput = (rawInput: string): Model => {
  const model = rawInput.split('\n').reduce((model, line) => {
    if (line === '') {
      return {
        ...model,
        parsingNums: false
      }
    }

    if (model.parsingNums) {
      const lm = line.match(/(\d+),(\d+)/)
      if (lm) {
        const [x,y] = [parseInt(lm[1], 10), parseInt(lm[2], 10)]
        if (!model.grid[y]) {
          model.grid[y] = []
        }
        model.grid[y][x] = 1

        return {
          ...model,
          maxX: Math.max(model.maxX, x + 1),
          maxY: Math.max(model.maxY, y + 1)
        }
      } 
    } else {
      const instr = line.match(/fold along (.+)/)
      if (instr) {
        return {
          ...model,
          instructions: model.instructions.concat(instr[1])
        }
      }
    }
    return model;
  }, {
    grid: [] as number[][],
    instructions: [] as string[],
    parsingNums: true,
    maxY: 0,
    maxX: 0
  } as Model);

  const fullGrid = [] as number[][]
  for (let y = 0; y < model.maxY; y++) {
    fullGrid[y] = []
    for (let x = 0; x < model.maxX; x++) {
      const c = model.grid[y] ? (model.grid[y][x] ? 1 : 0) : 0
      fullGrid[y].push(c)
    }
  }

  return {
    ...model,
    grid: fullGrid
  }
}

const count = (model: Model) => model.grid.reduce((t,l) => t + l.reduce((st, x) => st + x, 0), 0)
const fold = (model: Model) => {
  const [_, dir, l] = model.instructions.shift()?.match(/(x|y)=(\d+)/) ?? [null, null, null]
  if (!dir || !l) {
    throw new Error("Invalid instruction")
  }
  const foldLine = parseInt(l, 10)

  if (dir === 'x') {
    // Fold left
    const newGrid = [] as number[][]
    for (let y = 0; y < model.maxY; y++) {
      newGrid[y] = []
      for (let x = 0; x < foldLine; x++) {
        newGrid[y].push(model.grid[y][x] | model.grid[y][model.maxX - x - 1])
      }
    }
    return {
      ...model,
      grid: newGrid,
      maxX: foldLine
    }
  } else if (dir === 'y') {
    // Fold up
    const newGrid = [] as number[][]
    for (let y = 0; y < foldLine; y++) {
      newGrid[y] = []
      for (let x = 0; x < model.maxX; x++) {
        newGrid[y].push(model.grid[y][x] | model.grid[model.maxY - y - 1][x])
      }
    }
    return {
      ...model,
      grid: newGrid,
      maxY: foldLine
    }
  } else {
    throw new Error("Unexpected direction " + dir);
  }
}

const part1 = (rawInput: string) => {
  let model = parseInput(rawInput);
  
  return count(fold(model))
};

const part2 = (rawInput: string) => {
  let model = parseInput(rawInput);
  
  // console.log(model)
  while (model.instructions.length > 0) {
    model = fold(model)
    
  }
  logModel(model)
};

run({
  part1: {
    tests: [
      { input: `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`, expected: 17 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});

