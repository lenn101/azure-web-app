import { SkinFeed } from "./SkinFeed.js"
import LockerAPI from "@/lib/api/Locker.js";
import { verifySession } from "@/lib/session.js";
import UsersAPI from "@/lib/api/Users.js";
import ShopAPI from "@/lib/api/Shop.js";
import SkinsAPI from "@/lib/api/Skins.js";

export default async function SkinFeedWrapper() {
    const session = await verifySession()
    let user;
    let userSkins = []
    if (session){
        user = await UsersAPI.read(session.user.id, session.accessToken)
        userSkins = await LockerAPI.getUserSkins(user.id)
    }


    const shopItems = await ShopAPI.readAll()
    //promis all lässt alle asynchrone sachen gelcihzeitig passeieten
    // und man wartet einfach beim promis all anstatt das man jedes mal awaiten muss viel schneller
    const skins = await Promise.all(
        shopItems.map((item) => SkinsAPI.read(item.skinId))
    )


    return <SkinFeed skins={skins} userSkins={userSkins}/>
}
