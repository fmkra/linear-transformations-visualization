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

export const transformVector = (matrix: Matrix<number>, vector: number[]): number[] => matrix.values.map(row => row.reduce((acc, val, i) => acc + val * vector[i], 0))

export const add = (matrix1: Matrix<number>, matrix2: Matrix<number>): Matrix<number> => ({
    rows: matrix1.rows,
    cols: matrix1.cols,
    values: matrix1.values.map((row, i) => row.map((val, j) => val + matrix2.values[i][j]))
})

export const multiply = (matrix: Matrix<number>, scalar: number): Matrix<number> => ({
    rows: matrix.rows,
    cols: matrix.cols,
    values: matrix.values.map(row => row.map(val => val * scalar))
})

export const identity = (size: number): Matrix<number> => ({
    rows: size,
    cols: size,
    values: Array(size).fill(Array(size).fill(0)).map((row, i) => row.map((val:any, j:any) => i==j ? 1 : 0))
})

