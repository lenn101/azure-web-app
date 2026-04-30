import Link from "next/link"
import styles from "./Footer.module.css"


export default function Footer() {
    return(
        <footer className={styles.container}>
            <div className={styles.business}>
                <h1>BUSINESS</h1>
                <Link href={"/business#agb"}>AGB's</Link>
                <Link href={"/business#impressum"}>IMPRESSUM</Link>
                <Link href={"/business#copyright"}>COPYRIGHT</Link>
            </div>
            <div className={styles.aboutUs}>
                <h1>ABOUT US</h1>
                <p>SkinDeck@skindeck.ch</p>
                <p>+41 67 123 41 61</p>
                <p>620 Crossroads Blvd, Cary, NC 27518, Vereinigte Staaten</p>
            </div>
            <div className={styles.iFrame}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3!2d-78.7337762!3d35.7562743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf5e6075d3415%3A0xaf05589d3dc67187!2sEpic%20Games%20HQ!5e1!3m2!1sen!2sus!4v1"
                    width="200"
                    height="200"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </footer>
    )
}