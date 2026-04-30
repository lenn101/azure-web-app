"use client"

import styles from "./SkinFunctions.module.css"
import {addSkinAction, changeVbucks} from "@/actions/userAction"
import {useState} from "react"
import { useRouter,redirect } from "next/navigation"
import Link from "next/link"

export default function SkinFunctions(props){
    const router = useRouter();
    const skin = props.skin
    const user = props.user
    const [notEnoughVbucks, setNotEnoughVbucks] = useState(false)
    const [loading, setLoading] = useState(false)
    async function transaction() {
        if (props.owned){return}
        if (skin.price < user.vbucks){
            setLoading(true)
            setNotEnoughVbucks(false)
            await changeVbucks(user.id, (user.vbucks-skin.price))
            await addSkinAction(user.id, skin.id)
            router.refresh();
            setLoading(false)
            
        } else {
            setNotEnoughVbucks(true)
        }
    }

    return (
        <>
        {
            props.session ? (
                props.owned ? (
                    <button className={styles.purchased}>
                        PURCHASED
                    </button>
                ) : (
                    <button onClick={transaction} disabled={loading} className={styles.buyButton}>
                        {loading ? "PURCHASING..." : "PURCHASE"}
                    </button>
                )
            ) : (
                <Link href="/login">
                    <button className={styles.buyButton}>
                        {loading ? "PURCHASING..." : "PURCHASE"}
                    </button>
                </Link>
            )
            
        }
        {
            notEnoughVbucks ? (
                <p className={styles.broke}>
                    Ask Your Parents For More V-Bucks! Broke Ahh Goofy...
                </p>
            ) : (
                <></>
            )
        }
        </>
    )
}