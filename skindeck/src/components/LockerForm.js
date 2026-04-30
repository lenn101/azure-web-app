"use client"

import { UpdateAction } from "@/actions/userAction"
import { useActionState, useState } from "react"
import Image from "next/image"
import styles from "./LockerForm.module.css"
import DeleteButton from "@/components/DeleteButton"

/**
 * ist auch ein formular und braucht deshalb ein useActionState und wenn submit button
 * submited wird dann wir die updateAction gemacht und wir haben alles mitgegeben als prop
 * weil wir ja die Daten schon ins Formual drin speichern wollen
 */
export default function lockerForm(props) {
    const [state, action, pending] = useActionState(UpdateAction, {
        id: props?.id,
        data: {
            profilePicture: props.profilePicture,
            username: props.username,
            email: props.email,
            message: ""
        }
    })
    const [preview, setPreview] = useState(props.profilePicture)
    const [showPicker, setShowPicker] = useState(false) //gebraucht um picker slide öffnene und schliessen z.B wenn auf image gedrückt wird     

    return (
        <div className={styles.container}>
            <form className={styles.form} action={action}>
                <div className={styles.profileSection}>
                    <Image 
                        id="ProfilePicture" 
                        className={styles.profileImage}
                        src={`/${preview}`}
                        width={64} 
                        height={64} 
                        alt="profile Picture"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                        onClick={() => setShowPicker(!showPicker)}
                    />
                    <input type="hidden" id="profilePicture" name="profilePicture" value={preview} />
                </div>

                {showPicker && (
                    <div onClick={() => setShowPicker(false)}>
                        <div onClick={e => e.stopPropagation()}>
                            {props.lockerSkins.map(skin => (
                                <Image
                                    key={skin.id}
                                    src={`/${skin.image}`}
                                    width={80}
                                    height={80}
                                    alt={skin.name}
                                    onClick={() => {
                                        setPreview(skin.image)
                                        setShowPicker(false)
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Username</label>
                    <div className={styles.inputWrapper}>
                        <input id="username" name="username" defaultValue={state?.data.username} />
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <div className={styles.inputWrapper}>
                        <input id="email" name="email" defaultValue={state?.data.email} />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button type="submit" className={styles.button} disabled={pending}>
                        Update Locker
                    </button>
                    <DeleteButton id={props.id}/>
                </div>
                {(state?.message || state?.errors) && (
                    <p className={styles.errorText}>
                        {state?.message || "Ein unbekannter Fehler ist aufgetreten"}
                    </p>
                )}
            </form>
        </div>
    )
}

