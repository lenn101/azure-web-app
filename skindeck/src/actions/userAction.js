"use server"

import { z } from "zod"
import UsersAPI from "@/lib/api/Users"
import { createSession, verifySession } from "@/lib/session"
import { redirect } from "next/navigation"
import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import LockerAPI from "@/lib/api/Locker"

/**
 *  ist direkt ein Zod object damit man direkt die werte Validieren kann
 *  anstatt das man ein schema ohne validierung macht und dann validiert
 *  kann man direkt ein validiertes machen und dann safeparse zum transferen
 **/ 
const schema = z.object({
    email: z.string().trim().email("Please complete your email address"),
    password: z.string().trim(),
})

/**
* Login function, state merkt zustände (gedälchnis)
* formData roh array von json daten von Formular
*/
export async function loginAction(state, formData) {
    //speichert das formData object in einer variabel/object
    const data = Object.fromEntries(formData)
    //wir validieren jetzt die daten mit dem schema (zod object) safeparse überprüft es
    const fields = schema.safeParse(data)

    delete data.password
    if (!fields.success) {
        return {
            url: state?.url,
            data,
            errors: fields.error.flatten().fieldErrors,
        }
    }

    try {
        const data = await UsersAPI.login(fields.data) // Send a POST request to the API to log in the user
        await createSession(data.accessToken)   // Create a new session, storing the token in a cookie

    } catch (error) {
        return { // Return the form data and an error message summarising what went wrong as the new status
            url: state?.url,
            data,
            message:
                error.status === 400
                    ? "The email address or password you entered is invalid. Please try again."
                    : "A problem occurred with your login. Please try again later.",
        }
    }
    redirect(state?.url ?? "/")   // Redirect the user to the page they were originally trying to access.
}

export async function registerAction(prevState, formData) {
    const data = Object.fromEntries(formData);

    const schemaRegister = z.object({
        email: z.string().trim().email("Please enter a valid email"),
        username: z.string().trim().min(3, "Username must have at least 3 characters"),
        password: z.string().trim().min(6, "Password must have at least 6 characters"),
    });

    const validation = schemaRegister.safeParse(data);

    if (!validation.success) {
        delete data.password;
        return {
            url: prevState?.url,
            data,
            errors: validation.error.flatten().fieldErrors,
        };
    }
    //der neue user hat die validation daten und auch zwei standart werte welche nicht vom user entschieden z.B standart profilbild
    const newUser = {
        ...validation.data,
        vbucks: 500,
        profilePicture: "noskin.png"
    };

    try {
        await UsersAPI.register(newUser); //register mit userApi und übergeben nur der body weil accesstoken ist noch nicht vorhanden
        // dann machen wir ein login action mit daten vom user nach dem register damit er ein token bekommt
        const loginData = await UsersAPI.login({
            email: newUser.email,
            password: newUser.password
        });
        //speichert token in cookie
        await createSession(loginData.accessToken);

    } catch (error) {
        return {
            url: prevState?.url,
            data: { 
                email: data.email, 
                username: data.username 
            },
            message: "Registration failed. Maybe the email is already taken?"
        };
    }

    redirect("/");
}

export async function UpdateAction(state, formData) {
    //wir holen token mit der session
    const session = await verifySession()
    const accessToken = session.accessToken
    //holen die user id für die update action damit er sein user updated
    const id = session?.user?.id

    if (!id || !accessToken) {
        return { ...state, message: "Not authorized or Session expired" };
    }
    //übertragen daten in ein Object names data
    const data = Object.fromEntries(formData)
    //zod object
    const schemaUpdate = z.object({
        username: z.string().trim().min(3, "Username must have at least 3 characters"),
        email: z.string().trim().email("Please enter a valid email"),
        profilePicture: z.string()
    });
    //validiert daten
    const validated = schemaUpdate.safeParse(data)

    if (!validated.success) {
        return {
            url: state?.url,
            data,
            errors: validated.error.flatten().fieldErrors,
        };
    }
    //wir machen ein updateUser object fürs body
    const updatedUser = {
        ...validated.data
    }

    try {
        //wir machen ein patch anstatt update damit wir nur geänderte daten übergeben müssen
        //und geben id vom user, der body, accesstoken
        await UsersAPI.patch(id, updatedUser, accessToken)
    }
    catch (error){
        return {
            url: state?.url,
            data: { 
                email: data.email, 
                username: data.username
            },
            message: "Registration failed. Maybe the username is already taken?"
        };
    }
    redirect("/locker")
}
//löscht user und gespeichertes token
export async function deleteAction(id){
    const session = await verifySession()
    const accessToken = await session.accessToken
    await UsersAPI.delete(id, accessToken)
    await logoutAction()
}

/**
* A server action that handles user logouts.
*/
export async function logoutAction() {
    await deleteSession();
    redirect("/login")
}

/**
* Get username of the logged in user
*/
export async function getUsernameAction() {
    const session = await verifySession()
    const userId = session.user.id
    const user = UsersAPI.read(session.accessToken, userId)
    return user.username
}

/**
* Get username of user per id
*/
export async function getUsernamePerIdAction(id) {
    const session = await verifySession()
    const user = UsersAPI.read(session.accessToken, id)
    return user.username
}
/**
 * add skin to user in LockerApi eigentlich in LockerAction
 */
export async function addSkinAction(userId, skinId){
    const session = await verifySession()
    
    const locker = await LockerAPI.getUserSkins(userId, session.accessToken)
    const alreadyOwned = locker.some(entry => entry.skinId === skinId)
    if (alreadyOwned) {
        return { error: "Skin already owned" }
    }
    await LockerAPI.addSkin(userId, skinId, session.accessToken)
    revalidatePath("/", "layout")
}
//ändert vbucks wert aber auch nur patch damit nur vbucks updated wird
export async function changeVbucks(userId, value){
    const session = await verifySession()
    await UsersAPI.patch(userId, {vbucks:value}, session.accessToken)
    revalidatePath("/", "layout")
}
