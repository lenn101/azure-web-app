import { getJSON, patchJSON ,BASE_URL } from ".";

const URL = `${BASE_URL}/shop`

/*
* Posts API manages all post-related operations.
*/
const ShopAPI = {
    readAll() {
        return getJSON(`${URL}`)
    },
    patch(id, body){
            return patchJSON(`${URL}/${id}`,body)
    }
}
export default ShopAPI