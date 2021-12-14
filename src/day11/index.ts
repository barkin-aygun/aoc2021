import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.split('').map(x => parseInt(x, 10)));

const key = (i: number,j: number) => i + ',' + j

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput);
  let total = 0

  for (let i = 0; i < 100; i++) {
    // Enery level of each octopus increases by 1
    const flashes = new Set<string>()
    
    grid.forEach((line, i) => {
      line.forEach((c, j) => {
        grid[i][j] = c + 1

        if (c > 8) {
          // Add to the reset queue
          flashes.add(key(i,j))
        }
      })
    })

    const flashQueue = [...flashes]
    
    while (flashQueue.length > 0) {
      const [fi, fj] = flashQueue.shift()?.split(',').map(x => parseInt(x, 10)) as [number, number]

      if (fi > 0 ){
        // -1, -1
        if (fj > 0) {
          grid[fi-1][fj-1]++;
          if (grid[fi-1][fj-1] > 9 && !flashes.has(key(fi-1,fj-1))) {
            flashes.add(key(fi-1,fj-1))
            flashQueue.push(key(fi-1,fj-1))
          }
        }

        // -1, 0
        grid[fi-1][fj]++;
        if (grid[fi-1][fj] > 9 && !flashes.has(key(fi-1,fj))) {
          flashes.add(key(fi-1,fj))
          flashQueue.push(key(fi-1,fj))
        }

        // -1, +1
        if (fj < grid[0].length - 1) {
          grid[fi-1][fj+1]++;
          if (grid[fi-1][fj+1] > 9 && !flashes.has(key(fi-1,fj+1))) {
            flashes.add(key(fi-1,fj+1))
            flashQueue.push(key(fi-1,fj+1))
          }
        }
      }

      // 0, -1
      if (fj > 0) {
        grid[fi][fj-1]++;
          if (grid[fi][fj-1] > 9 && !flashes.has(key(fi,fj-1))) {
            flashes.add(key(fi,fj-1))
            flashQueue.push(key(fi,fj-1))
          }
      }

      // 0, +1
      if (fj < grid[0].length - 1) {
        grid[fi][fj+1]++;
        if (grid[fi][fj+1] > 9 && !flashes.has(key(fi,fj+1))) {
          flashes.add(key(fi,fj+1))
          flashQueue.push(key(fi,fj+1))
        }
      }

      if (fi < grid.length - 1){
        // +1, -1
        if (fj > 0) {
          grid[fi+1][fj-1]++;
          if (grid[fi+1][fj-1] > 9 && !flashes.has(key(fi+1,fj-1))) {
            flashes.add(key(fi+1,fj-1))
            flashQueue.push(key(fi+1,fj-1))
          }
        }

        // -1, 0
        grid[fi+1][fj]++;
        if (grid[fi+1][fj] > 9 && !flashes.has(key(fi+1,fj))) {
          flashes.add(key(fi+1,fj))
          flashQueue.push(key(fi+1,fj))
        }

        // -1, +1
        if (fj < grid[0].length - 1) {
          grid[fi+1][fj+1]++;
          if (grid[fi+1][fj+1] > 9 && !flashes.has(key(fi+1,fj+1))) {
            flashes.add(key(fi+1,fj+1))
            flashQueue.push(key(fi+1,fj+1))
          }
        }
      }
    }

    [...flashes].forEach(k => {
      const [i,j] = k.split(',').map(x => parseInt(x, 10)) as [number, number]

      grid[i][j] = 0
    })

    total += flashes.size
    // console.log(grid.join('\n'))
    // console.log('-----')
  }
  return total;
};

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput);
  const gridSize = grid.reduce((t,l) => t + l.length, 0)
  let step = 0

  while (true) {
    step++
    // Enery level of each octopus increases by 1
    const flashes = new Set<string>()
    
    grid.forEach((line, i) => {
      line.forEach((c, j) => {
        grid[i][j] = c + 1

        if (c > 8) {
          // Add to the reset queue
          flashes.add(key(i,j))
        }
      })
    })

    const flashQueue = [...flashes]
    
    while (flashQueue.length > 0) {
      const [fi, fj] = flashQueue.shift()?.split(',').map(x => parseInt(x, 10)) as [number, number]

      if (fi > 0 ){
        // -1, -1
        if (fj > 0) {
          grid[fi-1][fj-1]++;
          if (grid[fi-1][fj-1] > 9 && !flashes.has(key(fi-1,fj-1))) {
            flashes.add(key(fi-1,fj-1))
            flashQueue.push(key(fi-1,fj-1))
          }
        }

        // -1, 0
        grid[fi-1][fj]++;
        if (grid[fi-1][fj] > 9 && !flashes.has(key(fi-1,fj))) {
          flashes.add(key(fi-1,fj))
          flashQueue.push(key(fi-1,fj))
        }

        // -1, +1
        if (fj < grid[0].length - 1) {
          grid[fi-1][fj+1]++;
          if (grid[fi-1][fj+1] > 9 && !flashes.has(key(fi-1,fj+1))) {
            flashes.add(key(fi-1,fj+1))
            flashQueue.push(key(fi-1,fj+1))
          }
        }
      }

      // 0, -1
      if (fj > 0) {
        grid[fi][fj-1]++;
          if (grid[fi][fj-1] > 9 && !flashes.has(key(fi,fj-1))) {
            flashes.add(key(fi,fj-1))
            flashQueue.push(key(fi,fj-1))
          }
      }

      // 0, +1
      if (fj < grid[0].length - 1) {
        grid[fi][fj+1]++;
        if (grid[fi][fj+1] > 9 && !flashes.has(key(fi,fj+1))) {
          flashes.add(key(fi,fj+1))
          flashQueue.push(key(fi,fj+1))
        }
      }

      if (fi < grid.length - 1){
        // +1, -1
        if (fj > 0) {
          grid[fi+1][fj-1]++;
          if (grid[fi+1][fj-1] > 9 && !flashes.has(key(fi+1,fj-1))) {
            flashes.add(key(fi+1,fj-1))
            flashQueue.push(key(fi+1,fj-1))
          }
        }

        // -1, 0
        grid[fi+1][fj]++;
        if (grid[fi+1][fj] > 9 && !flashes.has(key(fi+1,fj))) {
          flashes.add(key(fi+1,fj))
          flashQueue.push(key(fi+1,fj))
        }

        // -1, +1
        if (fj < grid[0].length - 1) {
          grid[fi+1][fj+1]++;
          if (grid[fi+1][fj+1] > 9 && !flashes.has(key(fi+1,fj+1))) {
            flashes.add(key(fi+1,fj+1))
            flashQueue.push(key(fi+1,fj+1))
          }
        }
      }
    }

    [...flashes].forEach(k => {
      const [i,j] = k.split(',').map(x => parseInt(x, 10)) as [number, number]

      grid[i][j] = 0
    })

    if (flashes.size === gridSize) {
      return step;
    }
  }
};

run({
  part1: {
    tests: [
      { input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, expected: 1656 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, expected: 195 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
