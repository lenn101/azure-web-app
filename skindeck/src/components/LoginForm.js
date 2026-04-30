"use client"

import styles from "./LoginForm.module.css"
import {useActionState} from "react"
import { loginAction, registerAction } from "@/actions/userAction"
import { useSearchParams } from "next/navigation"
import Link from 'next/link'



//ist ein formular mit ein useActionState und bei submit vom button wir die action durchgeführt pending ist da damit man nicht 10 mal einloggen kann
//action bei uns ist login action oder register je nach true oder false beim props
export default function LoginForm(props) {
    const searchParams = useSearchParams()
    const [state, action, pending] = useActionState(
        props.register ? registerAction : loginAction,
        { url: searchParams.get("redirect") ?? undefined }
    )
    
    return (
        <div className={styles['form-container-styling']}>
            <form action={action} noValidate>
                <h2 className={styles.title}>{props.register ? "Register" : "Login"}</h2>

                <div>
                    <label htmlFor="email">Email address</label>
                    <input id="email" name="email" type="email" defaultValue={state?.data?.email} autoComplete="off"/>
                    {state?.errors?.email && (
                        <p className={styles.errorText}>{state.errors.email[0]}</p>
                    )}
                </div>

                {props.register && (
                    <div>
                        <label htmlFor="username">Username</label>
                        <input id="username" name="username" type="text" defaultValue={state?.data?.username} autoComplete="off"/>
                        {state?.errors?.username && (
                            <p className={styles.errorText}>{state.errors.username[0]}</p>
                        )}
                    </div>
                )}

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" autoComplete="new-password"/>
                    {state?.errors?.password && (
                        <p className={styles.errorText}>{state.errors.password[0]}</p>
                    )}
                </div>

                {state?.message && (
                    <div className={styles.errorBox}>
                        <p>{state.message}</p>
                    </div>
                )}

                <footer className={styles.footer}>
                    <button className={styles.button} disabled={pending} type="submit">
                        {pending ? "Please wait..." : (props.register ? "Register" : "Log In")}
                    </button>
                    <Link className={styles.link} href={props.register ? "/login" : "/register"}>
                        {props.register ? "Login" : "Register"}
                    </Link>
                </footer>
            </form>
        </div>
    );
}