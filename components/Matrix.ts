export interface Matrix<T> {
    rows: number
    cols: number
    values: T[][]
}

export const createEmptyMatrix = <T>(rows: number, cols: number, value: T): Matrix<T> => ({
    rows: rows,
    cols: cols,
    values: Array(rows).fill(Array(cols).fill(value))
})

export const setMatrixValue = <T>(matrix: Matrix<T>, row: number, col: number, value: T): Matrix<T> => ({
    rows: matrix.rows,
    cols: matrix.cols,
    values: matrix.values.map((R, r) => R.map((val, c) => (r==row && c==col ? value : val)))
})