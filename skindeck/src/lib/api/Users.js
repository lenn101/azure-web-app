import { postJSON, getJSON, deleteJSON, putJSON, patchJSON ,BASE_URL } from ".";

const URL = `${BASE_URL}`


const UsersAPI = {
    //post auch /login damit man ein user posten kann
    login(user){
        return postJSON(`${URL}/login`, user)
    },
    //auch ein post json mit nur body auf /register enpoint
    register(user){
        return postJSON(`${URL}/register`, user)
    },
    //um ein user zu bekommen braucht man die getJson funktion aber auf url /users/id damit man nur 1 user bekommt
    read(id, accessToken){
        return getJSON(`${URL}/users/${id}`, accessToken)
    },
    //geburacuht um zu schauen ob email vorhanden ist gibt emails zurück
    async readEmails(){
        const users = await getJSON(`${URL}/users`)
        return users.map(user => user.email)
    },
    //löscht user auch id gebraucht damit man nur der richtige löscht
    delete(id, accessToken){
        return deleteJSON(`${URL}/users/${id}`, accessToken)
    },
    update(id, user, accessToken){
        return putJSON(`${URL}/users/${id}`,user ,accessToken)
    },
    //updated ein user aber nur die geänderte werte man braucht hier id für erkennen user für body
    patch(id, user, accessToken){
        return patchJSON(`${URL}/users/${id}`,user ,accessToken)
    }
}
export default UsersAPI
