import LockerForm from "@/components/LockerForm"
import { verifySession } from "@/lib/session"
import UsersAPI from "@/lib/api/Users"
import LockerAPI from "@/lib/api/Locker"

/**
 * diese methode ist einfach die Locker page welche aber bei mirgebracuht wird um User/skins holen
 * weil ich kann es beim form nicht machen weil client seitig und ich brauche es aber dort eig könnte man einfach der ganze user mitgeben
 */
export default async function lockerPage() {
    const session = await verifySession()
    const id = session?.user.id
    const accessToken = session?.accessToken
    const user = await UsersAPI.read(id, accessToken)
    const lockerSkins = await LockerAPI.getUserSkins(user.id)

    return (
        <LockerForm id={user.id} profilePicture={user.profilePicture} username={user.username} email={user.email} lockerSkins={lockerSkins}/>
    )
}