import styles from "./skinDetails.module.css"
import SkinsAPI from "@/lib/api/Skins.js"
import { verifySession } from "@/lib/session"
import Image from "next/image"
import Link from "next/link"
import SkinFunctions from "@/components/SkinFunctions"
import UsersAPI from "@/lib/api/Users"
import LockerAPI from "@/lib/api/Locker"

export default async function SkinDetailsPage({ params }) {
    const { id } = await params
    const skin = await SkinsAPI.read(id)
    const session = await verifySession()
    let user = {
        id:null
    }
    if (session){
        const accessToken = session.accessToken
        user = await UsersAPI.read(session.user.id, accessToken)
    }

    let owned;
    let ownedText
    const userSkins = await LockerAPI.getUserSkins(user.id)
    userSkins.map(userSkin =>{
            if (userSkin.id === skin.id){
                owned = true
            }
        }
    )
    owned ? ownedText = "Owned" : ownedText = "Not Owned"

    const rarityClass = skin.rarity.toLowerCase();

    return (
        <main className={styles.container}>
            <div className={`${styles.shopWrapper} ${styles[rarityClass]}`}>
                
                <div className={styles.imageSection}>
                    <Image 
                        src={`/${skin.image}`} 
                        alt={skin.name} 
                        width={600} 
                        height={600} 
                        priority
                        className={styles.mainImage}
                    />
                </div>

                <div className={styles.infoSection}>
                    <div className={`${styles.badge} ${styles[skin.rarity.toLowerCase()]}`}>{skin.rarity}</div>
                    <h1 className={styles.name}>{skin.name}</h1>
                    
                    <div className={styles.priceTag}>
                        <Image src="/vbucks.png" alt="V-Bucks" width={30} height={30} />
                        <span>{skin.price}</span>
                    </div>

                    <p className={styles.description}>
                        {skin.description}
                    </p>

                    <div className={styles.actions}>
                        <SkinFunctions owned={owned} user={user} skin={skin} session={session}/>
                        <p className={`${styles.ownedText} ${styles[ownedText]}`}>
                            {ownedText}
                        </p>
                        <Link href="/" className={styles.return}>
                            RETURN
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    )
}