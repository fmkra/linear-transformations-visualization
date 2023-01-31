import React from 'react'
import { Matrix, setMatrixValue } from './Matrix'

const fontColor = '#fff'
const backgroundColor = '#000'
const lineWidth = '2px'

type St<T> = [T, React.Dispatch<React.SetStateAction<T>>]

const MatrixInput = <T,>({
    matrix: [matrix, setMatrix],
    toText,
    fromText,
}: {
    matrix: St<Matrix<T>>,
    toText: (v: T) => string,
    fromText: (v: string) => T,
}) => {
    

    return (
        <div style={{
            display: 'flex',
            padding: '3px'
        }}>
            <div style={{
                backgroundColor: backgroundColor,
                border: `solid ${lineWidth} ${fontColor}`,
            }}>
                <div style={{
                    margin: `-${lineWidth} ${lineWidth}`,
                    borderTop: `solid ${lineWidth} ${backgroundColor}`,
                    borderBottom: `solid ${lineWidth} ${backgroundColor}`,
                    padding: lineWidth,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${matrix.rows}, 1fr)`,
                    textAlign: 'center',
                }}>
                    {matrix.values.map((row, r) => row.map((value, c) => (
                        <div style={{
                            padding: '3px 10px'
                        }} key={`${r}-${c}`}>
                            <input type="text" value={toText(value)} onChange={e => setMatrix(setMatrixValue(matrix, r, c, fromText(e.target.value)))} style={{
                                width: '36px',
                                textAlign: 'center',
                            }} />
                        </div>
                    ))).flat()}
                </div>
            </div>
        </div>
    )
}

export default MatrixInput