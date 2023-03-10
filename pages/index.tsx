import React, { useState } from 'react'
import { eigenValues, eigenVectors, interpolateMatrix, Matrix, Vector } from '../components/Matrix'
import MatrixInput from '../components/MatrixInput'
import dynamic from 'next/dynamic'
import useTime from '../components/time'

const Graph = dynamic(() => import('../components/Graph'), { ssr: false })

export default function Home() {
    const [matrix, setMatrix] = useState<Matrix>([
        [3, 1],
        [0, 2],
    ])
    const evalues = eigenValues(matrix)
    const evectors = (evalues?.map((v) => eigenVectors(matrix, v)).filter((x) => x !== true && x !== null) ??
        []) as Vector[]

    const [time, animate] = useTime()

    const animatedMatrix = interpolateMatrix(
        [
            [1, 0],
            [0, 1],
        ],
        matrix,
        time
    )

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    zIndex: 2,
                    backgroundColor: '#282828',
                    boxShadow: '0 0 10px 5px #111',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                }}
            >
                <MatrixInput matrix={[matrix, setMatrix]} />
                <button onClick={animate} style={{ padding: '5px' }}>
                    Animate
                </button>
            </div>
            <div
                style={{
                    position: 'fixed',
                    zIndex: 2,
                    backgroundColor: '#282828',
                    boxShadow: '0 0 10px 5px #111',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    right: 0,
                }}
            >
                {evalues === null ? (
                    'No eigenvalues'
                ) : (
                    <>
                        Eeigenvalues:
                        <br />
                        {evalues.map((v, i) => {
                            const evectors = eigenVectors(matrix, v)
                            if (evectors === null) return null
                            if (evectors === true) return <div key={i}>{v} with vectors from R^2</div>
                            return (
                                <div key={i}>
                                    {v} with vectors {`[${evectors[0]}, ${evectors[1]}]`}
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
            <Graph matrix={animatedMatrix} vectors={evectors} />
        </>
    )
}
