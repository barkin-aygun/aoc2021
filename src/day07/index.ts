import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(',').map(x => parseInt(x, 10));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  // Fixed cost
  const dists = input.map((_, i) => input.reduce((t, k) => t + Math.abs(k - i - 1), 0))
  return Math.min(...dists);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  // Gradual cost(n) = n * (n + 1) / 2
  const dists = input.map((_, i) => input.reduce((t, k) => {
    const c = Math.abs(k - i - 1)
    return t + (c * (c+1) / 2)
  }, 0))
  return Math.min(...dists);
};

run({
  part1: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 },
      { input: `2,4`, expected: 2 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
