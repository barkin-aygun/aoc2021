import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const totalLen = input.length;

  const zeroes = Array(input[0].length).fill(0)
  
  input.forEach(l => {
    l.split('').forEach((c, i) => {
      zeroes[i] += c === '0' ? 1 : 0
    })
  })
  
  const gammas = [] as string[]
  const epsilons = [] as string[]
  zeroes.forEach((c, i) => {
    let e = '1', g = '0'
    if (c < totalLen - c) {
      g = '1'
      e = '0'
    }
    gammas.push(g)
    epsilons.push(e)
  })
  const gammaRate = parseInt(gammas.join(''), 2)
  const epsilonRate = parseInt(epsilons.join(''), 2)
  return gammaRate * epsilonRate
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput) as string[];
  const totalLen = input.length;

  let oxygen = '', co = '';
  let oxygenInput = [...input]
  let zeroes = 0
  for (let i = 0; i < input[0].length; i++) {
    zeroes = 0
  
    if (oxygenInput.length === 1) {
      oxygen = oxygenInput[0];
      break;
    }

    oxygenInput.forEach(l => {
        zeroes += l[i] === '0' ? 1 : 0
    })
    
    // More 1s
    if (zeroes <= oxygenInput.length - zeroes) {
      oxygenInput = oxygenInput.filter(l => l[i] === '1')
    } else {
      oxygenInput = oxygenInput.filter(l => l[i] === '0')
    }
  }

  if (oxygenInput.length === 1) {
    oxygen = oxygenInput[0];
  }

  let coInput = [...input]
  for (let i = 0; i < input[0].length; i++) {
    zeroes = 0
  
    if (coInput.length === 1) {
      co = coInput[0];
      break;
    }

    coInput.forEach(l => {
        zeroes += l[i] === '0' ? 1 : 0
    })
    
    // More 1s
    if (zeroes > coInput.length - zeroes) {
      coInput = coInput.filter(l => l[i] === '1')
    } else {
      coInput = coInput.filter(l => l[i] === '0')
    }
  }
  
  if (coInput.length === 1) {
    co = coInput[0];
  }
  console.log(oxygen)
  const coRate = parseInt(co, 2)
  const oxygenRate = parseInt(oxygen, 2)
  return oxygenRate * coRate
};

run({
  part1: {
    tests: [
      { input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`, expected: 198 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`, expected: 230},
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
