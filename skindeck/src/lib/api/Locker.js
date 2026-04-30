import { getJSON, postJSON, putJSON, deleteJSON, BASE_URL } from ".";
import { verifySession } from "../session";

const URL = `${BASE_URL}`

const LockerAPI = {
    async getUserSkins(userId) {
        const lockerEntries = await getJSON(`${URL}/locker?userId=${userId}`)

        const allSkins = await getJSON(`${URL}/skins`)

        const userSkins = allSkins.filter(skin => 
            lockerEntries.some(entry => entry.skinId === skin.id)
        );

        return userSkins
    },
    async addSkin(userId, skinId){
        return await postJSON(`${URL}/locker`, {userId, skinId})
    },
}
export default LockerAPI
