import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((t, l) => t + l.split(' | ')[1].split(' ').reduce((st, w) => {
    let sst = 0;
    if (w.length === 2 || w.length === 4 || w.length === 3 || w.length === 7) {
      sst = 1
    }
    return st + sst;
  }, 0), 0)
};

const union = (w1: string, w2: string): string => [...new Set([...w1, ...w2])].join('')
const difference = (w1: string, w2: string): string => [...new Set([...w1].filter(x => !w2.includes(x)))].join('')
const contains = (w1: string, w2: string): boolean => [...w2].every(x => w1.includes(x))
/*
 0000
1    2
1    2
 3333
4    5
4    5
 6666
*/
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let res = 0;

  input.forEach(line => {
    const words = line.split(' ').map(w => [...w].sort().join(''));

    let d1 = words.filter(w => w.length === 2)[0]
    let d7 = words.filter(w => w.length === 3)[0]
    let d4 = words.filter(w => w.length === 4)[0]
    let d8 = words.filter(w => w.length === 7)[0]
    let d9 = words.filter(w => w.length === 6 && difference(w, union(d4,d7)).length === 1)[0]
    let d0 = words.filter(w => w.length === 6 && w !== d9 && contains(w, d1))[0]
    let d6 = words.filter(w => w.length === 6 && w !== d9 && w !== d0)[0]
    let d5 = words.filter(w => w.length === 5 && contains(w, difference(d4, d1)))[0];
    let d3 = words.filter(w => w.length === 5 && contains(w, d1))[0];
    let d2 = words.filter(w => w.length === 5 && w !== d5 && w !== d3)[0];
    
    const wMap: Record<string, string> = [d0,d1,d2,d3,d4,d5,d6,d7,d8,d9].reduce((m, d, i) => {
      m[d] = i.toString();
      return m
    }, {} as Record<string, string>)

    const val = line.split(' | ')[1].split(' ').reduce((val, word) => {
      return val + wMap[[...word].sort().join('')]
    }, '')
    res += parseInt(val, 10);
  })


  return res;
};

run({
  part1: {
    tests: [
      { input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`, expected: 26 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`, expected: 5353 },
          ],
    solution: part2,
  },
  trimTestInputs: true,
});
