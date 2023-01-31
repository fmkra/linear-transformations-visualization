import React, { useState } from 'react'
import { createEmptyMatrix } from '../components/Matrix'
import MatrixInput from '../components/MatrixInput'

export default function Home() {
    const [matrix, setMatrix] = useState(() => createEmptyMatrix(2,2,0))

    console.log(matrix.values.flat())

    return (
        <MatrixInput matrix={[matrix, setMatrix]} toText={v => isNaN(v) ? '' :""+v} fromText={v => parseFloat(v)} />
    )
}
