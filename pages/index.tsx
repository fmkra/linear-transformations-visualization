import React, { useState } from 'react'
import { eigenValues, eigenVectors, interpolateMatrix, Matrix } from '../components/Matrix'
import MatrixInput from '../components/MatrixInput'
import dynamic from 'next/dynamic'

const Graph = dynamic(() => import('../components/Graph'), {ssr: false})

export default function Home() {
    const [matrix, setMatrix] = useState<Matrix>([[3,1],[0,2]])

    const [time, setTime] = useState(0)

    const animatedMatrix = interpolateMatrix([[1,0],[0,1]], matrix, time)

    return (
        <>
            <MatrixInput matrix={[matrix, setMatrix]}  />
            <input type="range" value={time} onChange={e => setTime(parseFloat(e.target.value))} min={0} max={1} step={0.01} />
            <div>{JSON.stringify(eigenVectors(matrix, 2))}</div>
            <Graph matrix={animatedMatrix} />
        </>
    )
}
