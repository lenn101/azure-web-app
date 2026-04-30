/*
   Dieses File stellt die zentrale API-Konfiguration bereit. Es definiert die
   BASE_URL und bietet vier Hilfsfunktionen (getJSON, postJSON, putJSON, deleteJSON)
   für die gängigen HTTP-Methoden an. Die Funktion handleResponse() verarbeitet
   die Antworten der API einheitlich und sorgt für ein konsistentes Error-Handling.
 */


const BASE_URL = "http://localhost:3001";
 
// schaut alle responses an und wenn sie falsy ist dann wird ein error geschickt und sonst wird sie als json zurück gegeben
async function handleResponse(response) {
    if (!response.ok) {
        const error = new Error("Request failed with status " + response.status);
        error.response = response;
        throw error;
    }
    return response.json();
}
 
/* GET 
* da wird geholt 
* im options werden alle wichtige infos für fetch geholt z.B die http methode
* den header und auch den body bei manchen hier nicht und der body wird stringified weil
* http request nur über string gehen nicht json
* da wird auch den token überprüft und am schluss wird noch fetch ausgeführt und
* wir bekommen die response zurück und überprüfen diese mit handleResponse
*/
export async function getJSON(url, accessToken = null) {
    const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }
 
    const response = await fetch(url, options);
    return handleResponse(response);
}
 
/* POST */
export async function postJSON(url, body = {}, accessToken = null) {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body),
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }
 
    const response = await fetch(url, options);
    return handleResponse(response);
}
 
/* PUT */
export async function putJSON(url, body = {}, accessToken = null) {
    const options = {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body),
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    const response = await fetch(url, options);
    return handleResponse(response);
}
 
/* DELETE */
export async function deleteJSON(url, accessToken = null) {
    const options = {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }
 
    const response = await fetch(url, options);
    return handleResponse(response);
}

export async function patchJSON(url, body = {}, accessToken = null) {
    const options = {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body),
    };

    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(url, options);
    return handleResponse(response);
}
 
export { BASE_URL };