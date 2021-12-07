import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(',').map(x => parseInt(x, 10));

const part1 = (rawInput: string) => {
  const fishes = parseInput(rawInput);

  for (let d = 0; d < 80; d++) {
    const len = fishes.length
    // console.log(fishes)
    for (let i = 0; i < len; i++) {
      fishes[i] = fishes[i] - 1
      if (fishes[i] === -1) {
        fishes[i] = 6
        fishes.push(8)
      }
    }
  }
  return fishes.length
};

const part2 = (rawInput: string) => {
  const fishes = parseInput(rawInput);

  let cycles = Array(9).fill(0)
  fishes.forEach(f => cycles[f]++)
  
  for (let d = 0; d < 256; d++) {
    // 8 becomes 0
    // i becomes i+1
    // c[0] is added to c[6]
    cycles = cycles.map((v, i, x) => {
      if (i === 8) {
        return x[0]
      } 
      else if (i === 6)
      {
        return x[7] + x[0]
      }
      else {
        return x[i+1]
      }
    })
  }

  return cycles.reduce((t, x) => t + x, 0)
};

run({
  part1: {
    tests: [
      { input: `3,4,3,1,2`, expected: 5934 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `3,4,3,1,2`, expected: 26984457539 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
