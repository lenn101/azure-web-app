"use client"

import Skin from "./Skin"
import styles from "./SkinFeed.module.css"
import {useState} from "react"

export function SkinFeed({ skins, userSkins }) {
    return (
        <div>
            <div className={styles.skins}>
                {skins.length > 0 ? (
                    skins.map((skin) => {
                        //schaut ob skin owned ist true/false
                        const isOwned = userSkins.some(userSkin => userSkin.id === skin.id);

                        return (
                            <Skin
                                key={skin.id}
                                id={skin.id}
                                name={skin.name} 
                                rarity={skin.rarity} 
                                image={skin.image}
                                price={skin.price}
                                owned={isOwned} 
                            />
                        );
                    })
                ) : (
                    <p>Keine Skins vorhanden.</p>
                )}
            </div>
        </div>
    )
}
