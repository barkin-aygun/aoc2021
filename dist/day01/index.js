import run from "aocrunner";
const parseInput = (rawInput) => rawInput.split("\n").map((x) => +x);
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.reduce((res, num, idx) => num > (input[idx - 1] ?? Infinity) ? res + 1 : res, 0);
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const sums = input.map((_, idx, nums) => nums[idx] + (nums[idx + 1] ?? 0) + (nums[idx + 2] ?? 0));
  return sums.reduce((res, num, idx) => num > (sums[idx - 1] ?? Infinity) ? res + 1 : res, 0);
};
run({
  part1: {
    tests: [
      { input: `199
      200
      208
      210
      200
      207
      240
      269
      260
      263`, expected: 7 }
    ],
    solution: part1
  },
  part2: {
    tests: [
      { input: `199
      200
      208
      210
      200
      207
      240
      269
      260
      263`, expected: 5 }
    ],
    solution: part2
  },
  trimTestInputs: true
});
//# sourceMappingURL=index.js.map
