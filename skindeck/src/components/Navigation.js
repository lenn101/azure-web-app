import { verifySession } from "@/lib/session"
import NavClient from "./NavClient"

export default async function Navigation() {
    const session = await verifySession()
    return <NavClient isLoggedIn={!!session} />
}