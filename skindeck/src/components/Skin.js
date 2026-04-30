import Link from "next/link"
import styles from "./Skin.module.css"
import Image from "next/image"

export default function Skin(props) {
    return (
        <Link href={`/skins/${props.id}`} className={styles.skinLink}>
            <article className={`${styles.skin} ${styles[props.rarity]}`}>
                <Image
                    className={styles.skinimg}
                    src={`/${props.image}`}
                    alt="skin"
                    fill
                />
                <h2 className={`${styles.rarity} ${styles[props.rarity]}`}>{props.rarity}</h2>
                <h2 className={styles.type}>SKIN</h2>
                <h2 className={styles.name}>{props.name}</h2>
                {props.owned ? (
                    <section className={`${styles.pricetag} ${styles[props.owned]}`}>
                        OWNED
                    </section>
                ) : (
                    <div className={styles.pricetag}>
                        <Image
                            className={styles.vbucksimg}
                            alt="vbucks"
                            src="/vbucks.png"
                            height={64}
                            width={64}
                        />
                        <p>{props.price} V-BUCKS</p>
                    </div>
                )}
            </article>
        </Link>
    )
}