import React, { useState } from 'react'
import { Matrix, setMatrixValue } from './Matrix'

const fontColor = '#fff'
const backgroundColor = '#282828'
const lineWidth = '2px'

type St<T> = [T, React.Dispatch<React.SetStateAction<T>>]

const useMatrixTextInput = (matrix: St<Matrix>, r: number, c: number) => {
    const [value, setValue] = useState<string>(matrix[0][r][c].toString())
    const onChange = (val: string) => {
        setValue(val)
        if (val === '' || isNaN(parseFloat(val)))
            matrix[1]([
                [1, 0],
                [0, 1],
            ])
        matrix[1](setMatrixValue(matrix[0], r, c, parseFloat(val)))
    }
    return [value, onChange] as const
}

const MatrixInput = ({ matrix: [matrix, setMatrix] }: { matrix: St<Matrix> }) => {
    const [m00, setM00] = useMatrixTextInput([matrix, setMatrix], 0, 0)
    const [m01, setM01] = useMatrixTextInput([matrix, setMatrix], 0, 1)
    const [m10, setM10] = useMatrixTextInput([matrix, setMatrix], 1, 0)
    const [m11, setM11] = useMatrixTextInput([matrix, setMatrix], 1, 1)

    return (
        <div
            style={{
                display: 'flex',
                padding: '3px',
            }}
        >
            <div
                style={{
                    backgroundColor: backgroundColor,
                    border: `solid ${lineWidth} ${fontColor}`,
                }}
            >
                <div
                    style={{
                        margin: `-${lineWidth} ${lineWidth}`,
                        borderTop: `solid ${lineWidth} ${backgroundColor}`,
                        borderBottom: `solid ${lineWidth} ${backgroundColor}`,
                        padding: lineWidth,
                        display: 'grid',
                        gridTemplateColumns: `repeat(2, 1fr)`,
                        textAlign: 'center',
                    }}
                >
                    <div style={{ padding: '3px 10px' }}>
                        <input
                            type="text"
                            value={m00}
                            onChange={(e) => setM00(e.target.value)}
                            style={{ width: '36px', textAlign: 'center' }}
                        />
                    </div>
                    <div style={{ padding: '3px 10px' }}>
                        <input
                            type="text"
                            value={m01}
                            onChange={(e) => setM01(e.target.value)}
                            style={{ width: '36px', textAlign: 'center' }}
                        />
                    </div>
                    <div style={{ padding: '3px 10px' }}>
                        <input
                            type="text"
                            value={m10}
                            onChange={(e) => setM10(e.target.value)}
                            style={{ width: '36px', textAlign: 'center' }}
                        />
                    </div>
                    <div style={{ padding: '3px 10px' }}>
                        <input
                            type="text"
                            value={m11}
                            onChange={(e) => setM11(e.target.value)}
                            style={{ width: '36px', textAlign: 'center' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatrixInput
