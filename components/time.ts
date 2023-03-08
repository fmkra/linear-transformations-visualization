import { useState, useRef } from 'react'

const useTime = () => {
    const STEP = 0.01
    const TIME = 1000
    const [time, setTime] = useState(0)
    const state = useRef<0 | 1>(0)
    const isRunning = useRef(false)

    const animate = () => {
        if (isRunning.current) return
        isRunning.current = true
        for (let i = 0; i <= 1; i += STEP) {
            setTimeout(() => {
                setTime(state.current == 1 ? 1 - i : i)
            }, TIME * i)
        }
        setTimeout(() => {
            isRunning.current = false
            state.current = state.current == 1 ? 0 : 1
            setTime(state.current)
        }, TIME * (STEP + 1))
    }

    return [time, animate] as const
}
export default useTime
