import run from "aocrunner";
import { Tally, Grid, updateTally, checkTally, calculateScore } from "./bingo.js"

const parseInput = (rawInput: string) => {
  const input = rawInput.split('\n').map(x => x.trim());
  const nums = input.shift()?.split(',').map(x => parseInt(x, 10)) ?? []
  let line;
  const grids = [] as Grid[]
  const tallys = [] as Tally[]
  
  while (input.length > 0) {
    line = input.shift()
    const grid = [] as Grid
    for (let i = 0; i < 5; i++) {
      grid.push(input.shift()?.match(/(\d+)\s*(\d+)\s*(\d+)\s*(\d+)\s*(\d+)/)?.slice(1, 6).map(x => parseInt(x, 10)) ?? [])
    }
    grids.push(grid);
    tallys.push(Array(5).fill(Array(5).fill(false), 0, 5))
  }
  return {
    nums, grids, tallys
  }
}

const part1 = (rawInput: string) => {
  let { nums, grids, tallys } = parseInput(rawInput);
  let result;

  for (const draw of nums) {
    tallys = tallys.map((t, i) => updateTally(t, grids[i], draw))

    for (let i = 0; i < tallys.length; i++) {
      if (checkTally(tallys[i])) {
        return calculateScore(tallys[i], grids[i], draw)
      }
    }
  }
  return 0;
};

const part2 = (rawInput: string) => {
  let { nums, grids, tallys } = parseInput(rawInput);
  let result;

  for (const draw of nums) {
    tallys = tallys.map((t, i) => updateTally(t, grids[i], draw))

    for (let i = 0; i < tallys.length; i++) {
      if (checkTally(tallys[i])) {
        if (tallys.length === 1) {
          return calculateScore(tallys[0], grids[0], draw);
        }
        grids.splice(i, 1)
        tallys.splice(i, 1)
        i--;
      }
    }
  }
  return 0;
};

run({
  part1: {
    tests: [
      { input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

      22 13 17 11  0
       8  2 23  4 24
      21  9 14 16  7
       6 10  3 18  5
       1 12 20 15 19
      
       3 15  0  2 22
       9 18 13 17  5
      19  8  7 25 23
      20 11 10 24  4
      14 21 16 12  6
      
      14 21 17 24  4
      10 16 15  9 19
      18  8 23 26 20
      22 11 13  6  5
       2  0 12  3  7`, expected: 4512 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

      22 13 17 11  0
       8  2 23  4 24
      21  9 14 16  7
       6 10  3 18  5
       1 12 20 15 19
      
       3 15  0  2 22
       9 18 13 17  5
      19  8  7 25 23
      20 11 10 24  4
      14 21 16 12  6
      
      14 21 17 24  4
      10 16 15  9 19
      18  8 23 26 20
      22 11 13  6  5
       2  0 12  3  7`, expected: 1924 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
