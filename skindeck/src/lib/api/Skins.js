import { getJSON, postJSON, putJSON, deleteJSON, BASE_URL } from ".";
import { verifySession } from "../session";

//url auf skins
const URL = `${BASE_URL}/skins`

/*
* Skins API manages all skin-related operations.
*/
const SkinsAPI = {
    /**
     * diese methode macht ein getjson auf die url base/skins
     */
    readAll() {
        return getJSON(`${URL}`)
    },
    /**
     * diese methode macht ein get aber mit id damit man nur ein skin bekommt
     */
    read(id){
        return getJSON(`${URL}/${id}`)
    }
}
export default SkinsAPI
