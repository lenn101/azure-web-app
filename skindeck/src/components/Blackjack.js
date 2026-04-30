"use client"
import { useState } from "react"
import { changeVbucks } from "@/actions/userAction"
import styles from "./Blackjack.module.css"
import Image from "next/image"

const cardValues = {
    ace: 11, king: 10, queen: 10, jack: 10, ten: 10,
    nine: 9, eight: 8, seven: 7, six: 6, five: 5,
    four: 4, three: 3, two: 2
}

const cardPics = {
    ace: "/blackjack/realAce.png",
    king: "/blackjack/king.png",
    queen: "/blackjack/queen.png",
    jack: "/blackjack/jack.png",
    ten: "/blackjack/ten.png",
    nine: "/blackjack/nine.png",
    eight: "/blackjack/eight.png",
    seven: "/blackjack/seven.png",
    six: "/blackjack/six.png",
    five: "/blackjack/five.png",
    four: "/blackjack/four.png",
    three: "/blackjack/three.png",
    two: "/blackjack/two.png"
}

export default function Blackjack({ user }) {
    const [playerCards, setPlayerCards] = useState([])
    const [bankCards, setBankCards] = useState([])
    const [gameState, setGameState] = useState("idle")
    const [message, setMessage] = useState("")
    const [bet, setBet] = useState(100)
    const [lastWin, setLastWin] = useState(0)
    const [vbucks, setVbucks] = useState(user.vbucks)

    function pickRandom() {
        const keys = Object.keys(cardValues)
        return keys[Math.floor(Math.random() * keys.length)]
    }

    function getHandValue(cards) {
        let value = 0
        let aces = 0
        for (const card of cards) {
            value += cardValues[card]
            if (card === "ace") aces++
        }
        while (value > 21 && aces > 0) {
            value -= 10
            aces--
        }
        return value
    }

    function isBlackjack(cards) {
        return cards.length === 2 && getHandValue(cards) === 21
    }

    async function finishRound(payoutAmount, msg) {
        const netChange = payoutAmount - bet
        const newBalance = vbucks + netChange
        
        setVbucks(newBalance)
        setLastWin(netChange)
        setMessage(msg)
        setGameState("finished")
        
        // Datenbank-Update
        await changeVbucks(user.id, newBalance)
    }

    async function play() {
        if (bet <= 0 || bet > vbucks) {
            setMessage("INVALID BET")
            return
        }

        setLastWin(0)
        setMessage("")

        const newPlayer = [pickRandom(), pickRandom()]
        const newBank = [pickRandom(), pickRandom()]
        setPlayerCards(newPlayer)
        setBankCards(newBank)

        const playerBJ = isBlackjack(newPlayer)
        const bankBJ = isBlackjack(newBank)

        if (playerBJ && bankBJ) {
            await finishRound(bet, "PUSH")
        } else if (playerBJ) {
            await finishRound(Math.floor(bet * 2.5), "BLACKJACK!")
        } else if (bankBJ) {
            await finishRound(0, "BANK BLACKJACK")
        } else {
            setGameState("playing")
        }
    }

    function hit() {
        const newCards = [...playerCards, pickRandom()]
        setPlayerCards(newCards)
        const value = getHandValue(newCards)
        if (value > 21) {
            finishRound(0, "BUST")
        } else if (value === 21) {
            stand(newCards)
        }
    }

    async function stand(currentPlayerCards = playerCards) {
        let bank = [...bankCards]
        while (getHandValue(bank) < 17) {
            bank.push(pickRandom())
        }
        setBankCards(bank)

        const playerValue = getHandValue(currentPlayerCards)
        const bankValue = getHandValue(bank)

        if (bankValue > 21 || playerValue > bankValue) {
            await finishRound(bet * 2, "YOU WON")
        } else if (playerValue === bankValue) {
            await finishRound(bet, "PUSH")
        } else {
            await finishRound(0, "YOU LOST")
        }
    }

    function resetRound() {
        setPlayerCards([])
        setBankCards([])
        setMessage("")
        setGameState("idle")
    }

    return (
        <div className={styles.blackjack}>
            <header className={styles.header}>
                <h1 className={styles.title}>BLACKJACK</h1>
                <div className={styles.balance}>
                    <Image
                        className={styles.profileImage}
                        src={`/${user.profilePicture}`}
                        width={50}
                        height={50}
                        alt="Profilbild"
                    />
                    <div className={styles.balanceInfo}>
                        <span className={styles.balanceLabel}>BALANCE</span>
                        <span className={styles.balanceValue}>
                            {gameState === "playing" ? vbucks - bet : vbucks}
                        </span>
                    </div>
                </div>
            </header>

            {/* div statt section verhindert W3C Warning */}
            <div className={styles.bank} data-label="DEALER">
                {bankCards.map((card, i) => (
                    <Image
                        className={styles.card}
                        key={`bank-${i}`}
                        src={cardPics[card]}
                        width={160}
                        height={240}
                        alt={`Bank Karte ${card}`}
                    />
                ))}
                {bankCards.length > 0 && (
                    <span className={styles.handValue}>{getHandValue(bankCards)}</span>
                )}
            </div>

            <div className={styles.player} data-label="YOU">
                <div className={styles.playerCards}>
                    {playerCards.map((card, i) => (
                        <Image
                            className={styles.card}
                            key={`player-${i}`}
                            src={cardPics[card]}
                            width={160}
                            height={240}
                            alt={`Deine Karte ${card}`}
                        />
                    ))}
                </div>
                {playerCards.length > 0 && (
                    <span className={styles.handValue}>{getHandValue(playerCards)}</span>
                )}
            </div>

            <footer className={styles.controls}>
                {message && (
                    <div className={styles.messageBox}>
                        <p className={styles.message}>{message}</p>
                        {gameState === "finished" && (
                            <p className={lastWin >= 0 ? styles.winAmount : styles.lossAmount}>
                                {lastWin >= 0 ? `+${lastWin}` : lastWin}
                            </p>
                        )}
                    </div>
                )}

                {gameState === "idle" || gameState === "finished" ? (
                    <div className={styles.betRow}>
                        <div className={styles.betInput}>
                            <label className={styles.betLabel} htmlFor="betAmount">BET</label>
                            <input
                                id="betAmount"
                                type="number"
                                className={styles.input}
                                value={bet}
                                min="1"
                                max={vbucks}
                                onChange={(e) => setBet(Number(e.target.value))}
                            />
                        </div>
                        <div className={styles.betQuick}>
                            <button onClick={() => setBet(50)} className={styles.chipButton}>50</button>
                            <button onClick={() => setBet(100)} className={styles.chipButton}>100</button>
                            <button onClick={() => setBet(500)} className={styles.chipButton}>500</button>
                        </div>
                        <button
                            onClick={() => {
                                if (gameState === "finished") resetRound()
                                play()
                            }}
                            className={styles.button}
                        >
                            DEAL
                        </button>
                    </div>
                ) : (
                    <div className={styles.actionRow}>
                        <button onClick={() => stand()} className={styles.button}>STAND</button>
                        <button onClick={hit} className={styles.button}>HIT</button>
                    </div>
                )}
            </footer>
        </div>
    )
}