export type Grid = number[][]
export type Tally = boolean[][]
/**
 * Given a tally and a board, will mark the given number in the tally
 * and return a new tally
 */
export function updateTally(tally: Tally, board: Grid, num: number): Tally {
    return tally.map((row, i) => {
        return row.map((n, j) => board[i][j] === num ? true : n)
    })
}

/**
 * Checks the given tally, true if there is a row or column complete
 */
export function checkTally(tally: Tally): boolean {
    for (let i = 0; i < tally.length; i++) {
        if (!tally[i].some(x => !x)) {
            return true;
        }
    }
    for (let i = 0; i < tally[0].length; i++) {
        if (!tally.map(l => l[i]).some(x => !x)) {
            return true;
        }
    }
    return false;
}

export function calculateScore(tally: Tally, board: Grid, num: number): number {
    return num * tally.reduce(
            (total, row, i) => 
                total 
                + row.reduce(
                    (st, b, j) =>  st + (b ? 0 : board[i][j]), 0)
            , 0)
}