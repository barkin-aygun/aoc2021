import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n')
  .map(s => {
    const m = s.match(/(\w+) (\d+)/);
    if (!m) {
      throw new Error(s)
    }
    return [m[1], +m[2]] as [string, number]
  })

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const res = input.reduce((pos, cmd, i ) => {
    if (!cmd) {
      throw new Error("Invalid command" + i)
    }
    switch (cmd[0]) {
      case "forward":
        return {h: pos.h + cmd[1], d: pos.d}
      case "down":
        return {h: pos.h, d: pos.d + cmd[1]}
      case "up":
        return {h: pos.h, d: pos.d - cmd[1]}
      default:
        throw new Error("Unexpected")
    }
  }, {h: 0, d: 0})
  return res.h * res.d
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const res = input.reduce((pos, cmd, i ) => {
    if (!cmd) {
      throw new Error("Invalid command" + i)
    }
    switch (cmd[0]) {
      case "forward":
        return {...pos, h: pos.h + cmd[1], d: pos.d + pos.a * cmd[1]}
      case "down":
        return {...pos, a: pos.a + cmd[1]}
      case "up":
        return {...pos, a: pos.a - cmd[1]}
      default:
        throw new Error("Unexpected")
    }
  }, {h: 0, d: 0, a: 0})
  return res.h * res.d
};

run({
  part1: {
    tests: [
      { input: `forward 5
      down 5
      forward 8
      up 3
      down 8
      forward 2`, expected: 150 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `forward 5
      down 5
      forward 8
      up 3
      down 8
      forward 2`, expected: 900 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
