import React, { useState } from 'react'
import { add, multiply, identity, Matrix } from '../components/Matrix'
import MatrixInput from '../components/MatrixInput'
import dynamic from 'next/dynamic'

const Graph = dynamic(() => import('../components/Graph'), {ssr: false})

export default function Home() {
    const [matrix, setMatrix] = useState<Matrix<number>>(() => ({
        rows: 2,
        cols: 2,
        values: [[3,1],[0,2]]
    }))

    const [time, setTime] = useState(0)

    const animatedMatrix = add(multiply(matrix, time), multiply(identity(2), 1-time))

    const det = 1 + time*(matrix.values[0][0] * matrix.values[1][1] - matrix.values[0][1] * matrix.values[1][0]-1)
    const animDet = animatedMatrix.values[0][0] * animatedMatrix.values[1][1] - animatedMatrix.values[0][1] * animatedMatrix.values[1][0]

    const correctedMatrix = multiply(animatedMatrix, 1/Math.sqrt(animDet))

    const correctDet = correctedMatrix.values[0][0] * correctedMatrix.values[1][1] - correctedMatrix.values[0][1] * correctedMatrix.values[1][0]

    return (
        <>
            <MatrixInput matrix={[matrix, setMatrix]} toText={v => isNaN(v) ? '' :""+v} fromText={v => parseFloat(v)} />
            <input type="range" value={time} onChange={e => setTime(parseFloat(e.target.value))} min={0} max={1} step={0.01} />
            <p>{det}</p>
            <p>{animDet}</p>
            <p>{correctDet}</p>
            <Graph matrix={correctedMatrix} />
        </>
    )
}
