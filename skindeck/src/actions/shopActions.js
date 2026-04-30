"use server"

import { z } from "zod"
import ShopAPI from "@/lib/api/Shop"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";
import SkinsAPI from "@/lib/api/Skins"

/**
 * Diese Methode wird benutzt um den Shop updaten aber wir benutzen patch damit wir nicht ganzen object
 * mitschicken müssen als erstes macht es ein request an API und nach regeln an Entität SkinAPI da wird
 * die Methode readall() aufgerufen diese hollt einfach alle skins dann werden die skins durchgemischt mit dem Math.random - 0.5
 * und dann werden 4 von diesen skins gewählt und dann gehen wir durch alle skins durch und wir wählen unsere skins und
 * setzen diese im shop und dann am schluss gehen wir noch zurück zum Home
 * async bedeutet einfach das die funktion async ist und await sagt warte hier auf diesen Promise
 * Promise sind eine versprechte Daten welche vom backend geholt werden müssen
 * Promise.all macht das man mehrere Async gelichzeitig und schliesst erst dann ab wenn alle promise da sind
 */

export default async function updateShop() {
    const allSkins = await SkinsAPI.readAll()

    const shuffled = allSkins.sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 4)

    await Promise.all(
        selected.map((skin, index) =>
            ShopAPI.patch(index + 1, {
                skinId: skin.id
            })
        )
    )

    revalidatePath("/")
}