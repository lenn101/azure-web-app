import styles from "./business.module.css"

export default function Business() {
    return (
        <main className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>LEGAL</h1>
                <p className={styles.heroSubtitle}>Epic Games, Inc.</p>
                <nav className={styles.toc}>
                    <a href="#agb" className={styles.tocLink}>AGB</a>
                    <a href="#impressum" className={styles.tocLink}>IMPRESSUM</a>
                    <a href="#copyright" className={styles.tocLink}>COPYRIGHT</a>
                </nav>
            </section>

            <section id="agb" className={styles.section}>
                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>AGB</h2>
                    <p className={styles.updated}>Zuletzt aktualisiert: 01. Januar 2026</p>

                    <h3>1. Geltungsbereich</h3>
                    <p>
                        Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") regeln
                        das Vertragsverhältnis zwischen Epic Games, Inc. (nachfolgend "Epic
                        Games") und ihren Nutzerinnen und Nutzern bezüglich der Nutzung des
                        Epic Games Store, der Epic Games Launcher Software sowie aller
                        zugehörigen Online-Dienste, Spiele und Inhalte.
                    </p>

                    <h3>2. Vertragsschluss</h3>
                    <p>
                        Mit der Registrierung eines Epic Games Kontos und der Zustimmung zu
                        diesen AGB kommt ein Nutzungsvertrag zwischen Ihnen und Epic Games
                        zustande. Die Nutzung ist erst nach erfolgreicher Registrierung und
                        Bestätigung Ihrer E-Mail-Adresse möglich.
                    </p>

                    <h3>3. Leistungen von Epic Games</h3>
                    <p>
                        Epic Games stellt eine digitale Plattform zur Verfügung, über die
                        Nutzer Spiele, Zusatzinhalte und weitere digitale Güter erwerben,
                        herunterladen und nutzen können. Der Funktionsumfang kann sich
                        jederzeit ändern, ohne dass daraus ein Anspruch auf bestimmte
                        Features abgeleitet werden kann.
                    </p>

                    <h3>4. Pflichten der Nutzer</h3>
                    <p>
                        Nutzer verpflichten sich, ihre Zugangsdaten vertraulich zu behandeln,
                        keine Cheats oder unerlaubte Drittanbietersoftware zu verwenden und
                        die Community-Richtlinien einzuhalten. Bei Verstössen behält sich
                        Epic Games vor, Konten vorübergehend oder dauerhaft zu sperren.
                    </p>

                    <h3>5. Preise und Zahlungsbedingungen</h3>
                    <p>
                        Alle im Epic Games Store angezeigten Preise verstehen sich inklusive
                        der gesetzlichen Mehrwertsteuer. Die Bezahlung erfolgt über die im
                        Shop angebotenen Zahlungsmethoden. Ein Rücktrittsrecht besteht nach
                        Massgabe der gesetzlichen Bestimmungen.
                    </p>

                    <h3>6. Haftung</h3>
                    <p>
                        Epic Games haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.
                        Für leichte Fahrlässigkeit haftet Epic Games nur bei Verletzung
                        wesentlicher Vertragspflichten und begrenzt auf den vertragstypisch
                        vorhersehbaren Schaden.
                    </p>

                    <h3>7. Änderungen der AGB</h3>
                    <p>
                        Epic Games behält sich das Recht vor, diese AGB jederzeit anzupassen.
                        Nutzer werden über Änderungen rechtzeitig informiert und haben die
                        Möglichkeit, den Änderungen zu widersprechen.
                    </p>
                </div>
            </section>

            <section id="impressum" className={styles.section}>
                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>IMPRESSUM</h2>
                    <p className={styles.updated}>Angaben gemäss gesetzlichen Anforderungen</p>

                    <h3>Anbieter</h3>
                    <p>
                        Epic Games, Inc.<br />
                        620 Crossroads Blvd<br />
                        Cary, NC 27518<br />
                        Vereinigte Staaten von Amerika
                    </p>

                    <h3>Vertretungsberechtigt</h3>
                    <p>
                        Chief Executive Officer: Tim Sweeney<br />
                        Registriert im Handelsregister von North Carolina<br />
                        Registernummer: 0327008
                    </p>

                    <h3>Kontakt</h3>
                        
                    <p>
                        Telefon: +41 67 123 41 61<br />
                        E-Mail: SkinDeck@skindeck.ch<br />
                        Support: www.epicgames.com/help
                    </p>


                    <h3>Umsatzsteuer-Identifikationsnummer</h3>
                    <p>
                        USt-IdNr. gemäss §27a Umsatzsteuergesetz: EU372008696
                    </p>

                    <h3>Verantwortlich für den Inhalt</h3>
                    <p>
                        Epic Games Legal Department<br />
                        620 Crossroads Blvd<br />
                        Cary, NC 27518, USA
                    </p>

                    <h3>Streitbeilegung</h3>
                    <p>
                        Die Europäische Kommission stellt eine Plattform zur
                        Online-Streitbeilegung bereit, die unter ec.europa.eu/consumers/odr
                        erreichbar ist. Epic Games ist weder bereit noch verpflichtet, an
                        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                        teilzunehmen.
                    </p>
                </div>
            </section>

            <section id="copyright" className={styles.section}>
                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>COPYRIGHT</h2>
                    <p className={styles.updated}>© 2026 Epic Games, Inc. Alle Rechte vorbehalten.</p>

                    <h3>Urheberrechtshinweis</h3>
                    <p>
                        Sämtliche Inhalte dieser Website, einschliesslich Texte, Grafiken,
                        Logos, Bilder, Audioclips, Videos, Software und deren Anordnung,
                        sind urheberrechtlich geschützt und Eigentum von Epic Games, Inc.
                        oder ihrer Lizenzgeber.
                    </p>

                    <h3>Markenrechte</h3>
                    <p>
                        Epic Games, Epic Games Store, Fortnite, Unreal Engine, Unreal,
                        Unreal Tournament sowie deren jeweilige Logos sind eingetragene
                        Marken oder Marken von Epic Games, Inc. in den Vereinigten Staaten
                        und anderen Ländern. Alle anderen Marken sind Eigentum ihrer
                        jeweiligen Inhaber.
                    </p>

                    <h3>Nutzungsrechte</h3>
                    <p>
                        Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                        Verwertung ausserhalb der Grenzen des Urheberrechts bedürfen der
                        schriftlichen Zustimmung von Epic Games. Downloads und Kopien
                        dieser Seite sind ausschliesslich für den privaten, nicht
                        kommerziellen Gebrauch gestattet.
                    </p>

                    <h3>Inhalte Dritter</h3>
                    <p>
                        Soweit Inhalte auf dieser Seite nicht von Epic Games erstellt
                        wurden, werden die Urheberrechte Dritter beachtet und entsprechend
                        gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
                        aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
                        Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
                        umgehend entfernen.
                    </p>

                    <h3>DMCA-Anfragen</h3>
                    <p>
                        Anfragen nach dem Digital Millennium Copyright Act (DMCA) richten
                        Sie bitte schriftlich an dmca@epicgames.com oder postalisch an die
                        oben genannte Adresse, zu Händen der Rechtsabteilung.
                    </p>
                </div>
            </section>
        </main>
    )
}