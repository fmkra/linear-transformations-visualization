import React, { useRef } from 'react'
import Sketch from 'react-p5'
import p5Types from 'p5'
import { Matrix, transformVector } from './Matrix';


const Graph = ({matrix}: {matrix: Matrix<number>}) => {
    const width = 800
    const height = 600
    const scale = 4
    const lineWidth = 2

    const endlessLine = (p5: p5Types, x1: number, y1: number, x2: number, y2: number, sc: number) => {
        if(x1 == x2 && y1 == y2) {
            p5.point(x1, y1)
            return
        }
        const scale = Math.max(p5.windowHeight, p5.windowWidth)/sc/2
        const mag = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
        const dx = (x2-x1)/mag*scale
        const dy = (y2-y1)/mag*scale
        p5.line(x1, y1, x1+dx, y1+dy)
        p5.line(x1, y1, x1-dx, y1-dy)
    }


    const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(width, height).parent(canvasParentRef)
	}
    
	const draw = (p5: p5Types) => {
        p5.background(40)
        p5.translate(width/2, height/2)
        const sc = Math.min(height, width)/scale/2
        p5.scale(sc, -sc)
        p5.stroke(255)
        const xmax = width/sc/2
        const ymax = height/sc/2
        
        p5.strokeWeight(lineWidth/sc/2)
        p5.stroke(96)
        for(let y = Math.ceil(-ymax); y <= ymax; y++) {
            endlessLine(p5, 0, y, 1, y, sc)
        }
        for(let x = Math.ceil(-xmax); x <= xmax; x++) {
            endlessLine(p5, x, 0, x, 1, sc)
        }
        p5.strokeWeight(lineWidth/sc)
        p5.stroke(255)
        
        p5.stroke(35, 148, 235)
        for(let y = Math.ceil(-ymax); y <= ymax; y++) {
            const [x1, y1] = transformVector(matrix, [0, y])
            const [x2, y2] = transformVector(matrix, [1, y])
            endlessLine(p5, x1, y1, x2, y2, sc)
        }
        for(let x = Math.ceil(-xmax); x <= xmax; x++) {
            const [x1, y1] = transformVector(matrix, [x, 0])
            const [x2, y2] = transformVector(matrix, [x, 1])
            endlessLine(p5, x1, y1, x2, y2, sc)
        }
	}

	return <Sketch setup={setup} draw={draw} />
}

export default Graph