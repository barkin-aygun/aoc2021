import run from "aocrunner";

interface Model {
  polymer: string,
  rules: Map<string, string>,
  counts: Map<string, number>
}

interface PairModel {
  rules: Map<string, string>,
  pairs: Map<string, number>
  counts: Map<string, number>
}

const parseInput = (rawInput: string): Model => {
  const lines = rawInput.split('\n')
  const polymer = lines.shift() ?? ""
  lines.shift()
  const rules = new Map<string, string>()
  const counts = new Map<string, number>()
  lines.forEach(l => {
    const [r, a,b] = l.match(/(\w+) -> (\w)/) ?? [null, 'a', 'b']
    if (!r || !a || !b) {
      throw new Error("Unexpected line" + l);
    }
    rules.set(a, b)
  })
  polymer.split('').forEach(c => {
    counts.set(c, (counts.get(c) ?? 0) + 1)
  })

  return {
    rules, polymer, counts
  }
}


const process = (model: Model) => {
  let newPolymer: string = ''
  for (let i = 0; i < model.polymer.length - 1; i++) {
    const key = model.polymer.substr(i, 2)
    const char = model.rules.get(key) ?? ''
    newPolymer += model.polymer[i] + model.rules.get(key)
    model.counts.set(char, (model.counts.get(char) ?? 0) + 1)
  }
  model.counts.delete('')
  return {
    rules: model.rules,
    polymer: newPolymer + model.polymer[model.polymer.length - 1],
    counts: model.counts
  }
}

const quantityDiff = (counts: Map<string, number>) => {
  let min = Infinity, max = 0
  counts.forEach((v, k) => {
    min = Math.min(min, v)
    max = Math.max(max, v)
  })
  return max - min
}

const part1 = (rawInput: string) => {
  const model = parseInput(rawInput);
  let latest = model
  for (let i = 0; i < 10; i++) {
    latest = process(latest)
  }
  // console.log(latest.counts)
  return quantityDiff(latest.counts);
};


const parseInput2 = (rawInput: string): PairModel => {
  const lines = rawInput.split('\n')
  const polymerTemplate = lines.shift() ?? ""
  const rules = new Map<string, string>()
  const counts = new Map<string, number>()
  const pairs = new Map<string, number>()
  lines.shift()
  lines.forEach(l => {
    const [r, a,b] = l.match(/(\w+) -> (\w)/) ?? [null, 'a', 'b']
    if (!r || !a || !b) {
      throw new Error("Unexpected line" + l);
    }
    rules.set(a, b)
  })

  for (let i = 0; i < polymerTemplate.length - 1; i++) {
    const key = polymerTemplate.substr(i, 2)
    pairs.set(key, (pairs.get(key) ?? 0) + 1)
  }
  polymerTemplate.split('').forEach(c => {
    counts.set(c, (counts.get(c) ?? 0) + 1)
  })
  
  return {
    rules, counts, pairs
  }
}

const process2 = (model: PairModel): PairModel => {
  const newPairs = new Map(model.pairs)
  const newCounts = new Map(model.counts)
  model.pairs.forEach((c, pair) => {
    const insertedChar = model.rules.get(pair) ?? ''
    newCounts.set(insertedChar, (newCounts.get(insertedChar) ?? 0) + c)
    const pair1 = pair[0] + insertedChar
    const pair2 = insertedChar + pair[1]
    newPairs.set(pair1, (newPairs.get(pair1) ?? 0) + c)
    newPairs.set(pair2, (newPairs.get(pair2) ?? 0) + c)
    newPairs.set(pair, ((newPairs.get(pair) ?? c) - c))
  })

  newCounts.delete('')
  return {rules: model.rules,
          pairs: newPairs,
          counts: newCounts
  }
} 

const part2 = (rawInput: string) => {
  let  model = parseInput2(rawInput);
  
  for (let i = 0; i < 40; i++) {
    model = process2(model)
  }
  return quantityDiff(model.counts);
};

run({
  part1: {
    tests: [
      { input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`, expected: 1588 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`, expected: 2188189693529 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
