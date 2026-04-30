"use client"
import { useEffect, useState, useRef } from "react"
import updateShop from "@/actions/shopActions"

export function ShopTimer() {
    const [timeLeft, setTimeLeft] = useState("")

    useEffect(() => {
        function calcTimeLeft() {
            const now = new Date()
            const minutes = now.getMinutes()
            const seconds = now.getSeconds()

            // zum zeigen: 
            //const totalSeconds = seconds % 10 === 0 ? 0 : 10 - (seconds % 10)
            const totalSecondsOfDay = minutes * 60 + seconds
            const remainder = totalSecondsOfDay % (30 * 60)
            const totalSeconds = remainder === 0 ? 0 : (30 * 60) - remainder

            if (totalSeconds <= 0) {
                updateShop()
            }

            //fürs zeigen m auskommentieren und bei time left "00:¨${s}"
            const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0")
            const s = (totalSeconds % 60).toString().padStart(2, "0")
            setTimeLeft(`${m}:${s}`)
        }

        calcTimeLeft()
        const interval = setInterval(calcTimeLeft, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <p>
            Nächste Shop-Rotation in: <strong>{timeLeft}</strong>
        </p>
    )
}