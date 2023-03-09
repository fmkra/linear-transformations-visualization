export type Matrix = [[number, number], [number, number]]

export type Vector = [number, number]

export const identity = [
    [1, 0],
    [0, 1],
]

export const setMatrixValue = (matrix: Matrix, row: number, col: number, value: number): Matrix => [
    [row == 0 && col == 0 ? value : matrix[0][0], row == 0 && col == 1 ? value : matrix[0][1]],
    [row == 1 && col == 0 ? value : matrix[1][0], row == 1 && col == 1 ? value : matrix[1][1]],
]

export const transformVector = (matrix: Matrix, vector: Vector): Vector => [
    matrix[0][0] * vector[0] + matrix[0][1] * vector[1],
    matrix[1][0] * vector[0] + matrix[1][1] * vector[1],
]

export const det = (matrix: Matrix): number => matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]

export const add = (matrix1: Matrix, matrix2: Matrix): Matrix => [
    [matrix1[0][0] + matrix2[0][0], matrix1[0][1] + matrix2[0][1]],
    [matrix1[1][0] + matrix2[1][0], matrix1[1][1] + matrix2[1][1]],
]

export const scalarMultiply = (matrix: Matrix, scalar: number): Matrix => [
    [matrix[0][0] * scalar, matrix[0][1] * scalar],
    [matrix[1][0] * scalar, matrix[1][1] * scalar],
]

export const inverse = (matrix: Matrix): Matrix => {
    const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    return [
        [matrix[1][1] / det, -matrix[0][1] / det],
        [-matrix[1][0] / det, matrix[0][0] / det],
    ]
}

export const interpolateMatrix = (matrix1: Matrix, matrix2: Matrix, t: number): Matrix => {
    const lerped = add(scalarMultiply(matrix1, 1 - t), scalarMultiply(matrix2, t))
    const detLerped = det(lerped)
    const expectedDet = det(matrix1) * (1 - t) + det(matrix2) * t
    const scale = Math.sqrt(expectedDet / detLerped)
    return scalarMultiply(lerped, scale)
}

export const eigenValues = (matrix: Matrix): null | [number] | [number, number] => {
    const m = (matrix[0][0] + matrix[1][1]) / 2
    const p = det(matrix)
    const q = Math.sqrt(m * m - p)
    if (isNaN(q)) return null
    if (Math.abs(q) <= 1e-6) return [m]
    return [m - q, m + q]
}

export const ker = (matrix: Matrix): null | Vector | true => {
    if (Math.abs(det(matrix)) > 1e-6) return null
    let [a, b, c, d] = [matrix[0][0], matrix[0][1], matrix[1][0], matrix[1][1]]
    if (a == 0 && b == 0 && c == 0 && d == 0) return true
    return [-b, a]
}

export const eigenVectors = (matrix: Matrix, eigenValue: number): null | Vector | true => {
    const m: Matrix = [
        [matrix[0][0] - eigenValue, matrix[0][1]],
        [matrix[1][0], matrix[1][1] - eigenValue],
    ]
    return ker(m)
}
