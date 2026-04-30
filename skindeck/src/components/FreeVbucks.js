"use client"
import { useState, useEffect } from "react"
import { ShopTimer } from "@/components/ShopTimer";
import styles from "./FreeVbucks.module.css"
import { changeVbucks } from "@/actions/userAction"

const COOLDOWN_MS = 10 * 60 * 1000
const STORAGE_KEY = "freeVbucksCooldownEnd"

export default function FreeVbucks(props) {
    const [secondsLeft, setSecondsLeft] = useState(0)
    const user = props.user
    const allSkinsIds = props.allSkinsIds

    useEffect(() => {
        function tick() {
            const endTime = parseInt(localStorage.getItem(STORAGE_KEY) || "0")
            const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000))
            setSecondsLeft(remaining)
        }

        tick()
        const interval = setInterval(tick, 1000)
        return () => clearInterval(interval)
    }, [])

    function handleCollect() {
        if (secondsLeft > 0) return
        const endTime = Date.now() + COOLDOWN_MS
        localStorage.setItem(STORAGE_KEY, endTime.toString())
        setSecondsLeft(COOLDOWN_MS / 1000)
        // hier später: V-Bucks gutschreiben via Server Action
        changeVbucks(user.id, (user.vbucks + props.amount))
    }

    function formatTime(s) {
        const h = Math.floor(s / 3600)
        const m = Math.floor((s % 3600) / 60)
        const sec = s % 60
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
    }

    const ready = secondsLeft === 0

    return (
        <div className={styles.freevbucks}>
            {ready ? (
                <button onClick={handleCollect} className={styles.collectButton}>
                    COLLECT FREE VBUCKS
                </button>
            ) : (
                <span className={styles.text}>
                    NÄCHSTE FREE V-BUCKS IN <span className={styles.timer}>{formatTime(secondsLeft)}</span>
                </span>
            )}
            <ShopTimer allSkinsIds={allSkinsIds}/>
        </div>
    )
}