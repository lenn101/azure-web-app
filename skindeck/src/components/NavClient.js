"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { logoutAction } from "@/actions/userAction"
import styles from "./Navigation.module.css"

export default function NavClient({ isLoggedIn }) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [open])

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setOpen(false)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    const close = () => setOpen(false)

    return (
        <>
            <button
                className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
                onClick={() => setOpen(!open)}
                aria-label="Menü öffnen"
                aria-expanded={open}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
                <ul className={styles.list}>
                    <li>
                        <Link className={styles.link} href="/" onClick={close}>SHOP</Link>
                    </li>
                    <li>
                        <Link className={styles.link} href={isLoggedIn ? "/blackjack" : "/login"} onClick={close}>BLACKJACK</Link>
                    </li>
                    <li>
                        <Link className={styles.link} href={isLoggedIn ? "/locker" : "/login"} onClick={close}>LOCKER</Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <form action={logoutAction}>
                                <button type="submit" className={styles.link} onClick={close}>LOGOUT</button>
                            </form>
                        </li>
                    )}
                </ul>
            </nav>

            {open && <div className={styles.backdrop} onClick={close}></div>}
        </>
    )
}