"use client"
import styles from "./not-found.module.css"; // Pfad anpassen!
import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
    return (
        <main className={`${styles.main} not-found-page`}>
            <section className={styles.section}>
                <article className={styles.textContent}>
                    <h1>404</h1>
                    <p>Diese Seite wurde gevaulted</p>
                    <Link href="/">
                        <button className={styles.button}>zurück zur Lobby</button>
                    </Link>
                </article>
                <article className={styles.imageContent}>
                    <Image 
                        width={650} 
                        height={512} 
                        src="/sad_tung.png" 
                        alt="sad tung" 
                        className={styles.sadImage}
                        priority
                    />
                </article>
            </section>
        </main>
    );
}