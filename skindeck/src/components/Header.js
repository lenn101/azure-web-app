import Navigation from "@/components/Navigation";
import styles from "./Header.module.css"
import Link from "next/link"
import Image from "next/image";
import { verifySession } from "@/lib/session";
import { logoutAction } from "@/actions/userAction";
import UsersAPI from "@/lib/api/Users";

export default async function Header() {
    const session = await verifySession()
    let user;
    if (session){
        const accessToken = session?.accessToken
        user = await UsersAPI.read(session.user.id, accessToken)
    }

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <Image src="/logo.png" alt="logo" width={64} height={64} />
                <h1>SKINDECK</h1>
            </Link>

            <Navigation />

            <div className={styles.userdata}>
                {session ? (
                    <>
                        <div className={styles.vbucks}>
                            <Image src="/vbucks.png" alt="vbucks" width={32} height={32} />
                            <span className={styles.amount}>{user.vbucks}</span>
                        </div>
                        
                        <Link href="/locker" className={styles.profile}>
                            <Image src={`/${user.profilePicture}`} alt="noskin" width={64} height={64} style={{ objectFit: "cover", objectPosition: "top" }}/>
                        </Link>
                    </>
                ) : (
                    <Link href="/login" className={styles.loginLink}>LOGIN</Link>
                )}
            </div>
        </header>
    )
}