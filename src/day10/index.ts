import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

type Stack = string[]

const costs = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

const corrupts = {
  '(': ']}>',
  '[': ')}>',
  '{': ')]>',
  '<': ')]}'
}

const scores = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4
}

type ValidChar = '[' | '(' | '{' | '<' | '>' | '}' | ')' | ']'
type Opener = '[' | '(' | '{' | '<'
type Closer = '>' | '}' | ')' | ']'

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((totalScore: number, line: string) => {
    const stack: Stack = []
    const chars = line.split('')
    
    while (chars.length > 0) {
      const c = chars.shift() as ValidChar
      if (stack.length === 0 || '<{[('.includes(c)) {
        stack.unshift(c)
      } else if ((corrupts[stack[0] as Opener] ?? '').includes(c)) {
        return totalScore + costs[c as Closer]
      } else {
        stack.shift()
      }
    }

    return totalScore
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  const completionscores = input.reduce((tally: number[], line: string) => {
    const stack: Stack = []
    const chars = line.split('')
    
    while (chars.length > 0) {
      const c = chars.shift() as ValidChar
      if (stack.length === 0 || '<{[('.includes(c)) {
        stack.unshift(c)
      } else if ((corrupts[stack[0] as Opener] ?? '').includes(c)) {
        return tally;
      } else {
        stack.shift()
      }
    }

    const score = stack.reduce((ps, c) => {
      return ps * 5 + scores[c as Opener]
    }, 0)

    return tally.concat(score)
  }, []);

  return completionscores.sort((a,b) => a - b)[(completionscores.length - 1) / 2]
};

run({
  part1: {
    tests: [
      { input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`, expected: 26397 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`, expected: 288957 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
