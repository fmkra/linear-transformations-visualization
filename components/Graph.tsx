import React from 'react'
import Sketch from 'react-p5'
import p5Types from 'p5'
import { det, inverse, Matrix, Vector, transformVector } from './Matrix';


const Graph = ({matrix, vectors}: {matrix: Matrix, vectors: Vector[]}) => {
    const width = 800
    const height = 600
    const scale = 4
    const lineWidth = 2

    const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(width, height).parent(canvasParentRef)
	}
    
	const draw = (p5: p5Types) => {
        p5.background(40)
        p5.translate(width/2, height/2)
        const sc = Math.min(height, width)/scale/2
        p5.scale(sc, -sc)
        p5.stroke(255)
        const _xmax = width/sc/2
        const _ymax = height/sc/2
        let xmax = _xmax
        let ymax = _ymax
        if(Math.abs(det(matrix)) >= 1e-3) {
            const inv = inverse(matrix)
            const p1 = transformVector(inv, [-xmax, -ymax])
            const p2 = transformVector(inv, [xmax, -ymax])
            const p3 = transformVector(inv, [xmax, ymax])
            const p4 = transformVector(inv, [-xmax, ymax])
            xmax = Math.max(Math.abs(p1[0]), Math.abs(p2[0]), Math.abs(p3[0]), Math.abs(p4[0]))
            ymax = Math.max(Math.abs(p1[1]), Math.abs(p2[1]), Math.abs(p3[1]), Math.abs(p4[1]))
        }
        xmax = Math.min(xmax, 100)
        ymax = Math.min(ymax, 100)

        // grid before transformation
        p5.strokeWeight(lineWidth/sc/2)
        p5.stroke(96)
        for(let y = Math.ceil(-_ymax); y <= _ymax; y++) {
            p5.line(-_xmax, y, _xmax, y)
        }
        for(let x = Math.ceil(-_xmax); x <= _xmax; x++) {
            p5.line(x, -_ymax, x, _ymax)
        }
        
        // grid after transformation
        for(let y = Math.ceil(-ymax); y <= ymax; y++) {
            if(y == 0) {
                p5.stroke(255)
                p5.strokeWeight(lineWidth/sc)
            } else {
                p5.stroke(35, 148, 235)
                p5.strokeWeight(lineWidth/sc/2)
            }
            const [x1, y1] = transformVector(matrix, [-xmax, y])
            const [x2, y2] = transformVector(matrix, [xmax, y])
            p5.line(x1, y1, x2, y2)
        }
        for(let x = Math.ceil(-xmax); x <= xmax; x++) {
            if(x == 0) {
                p5.stroke(255)
                p5.strokeWeight(lineWidth/sc)
            } else {
                p5.stroke(35, 148, 235)
                p5.strokeWeight(lineWidth/sc/2)
            }
            const [x1, y1] = transformVector(matrix, [x, -ymax])
            const [x2, y2] = transformVector(matrix, [x, ymax])
            p5.line(x1, y1, x2, y2)
        }

        // vectors after transformation
        p5.strokeWeight(lineWidth/sc)
        p5.stroke(255, 0, 0)
        for(const v of vectors) {
            const [x1, y1] = transformVector(matrix, [0, 0])
            const [x2, y2] = transformVector(matrix, v)
            p5.line(x1, y1, x2, y2)
        }
	}

	return <Sketch setup={setup} draw={draw} />
}

export default Graph