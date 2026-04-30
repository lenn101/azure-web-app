import Blackjack from "@/components/Blackjack"
import styles from "./blackjack.module.css"
import { verifySession } from "@/lib/session"
import UsersAPI from "@/lib/api/Users"

export default async function blackjack(){
    /**
     * session wird überprüft um user hinauszuziehen wenns nicht geht dann gibts
     * ein error eig auf / redirecten aber man kommt eif nicht auf diese seite ohne token
     * schon validiert in /
     */
    const session = await verifySession()
    let user
    if (session){
        user = await UsersAPI.read(session.user.id, session.accessToken)
    }
    return (
        <> 
            <Blackjack user={user}/>
        </>
    )
}