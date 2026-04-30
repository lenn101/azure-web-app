const jsonServer = require('json-server');//importiert der json server
const auth = require('json-server-auth'); // 1. Auth importieren
const cors = require('cors'); //importiert cors
const path = require('path'); //importiert paths/endpoints

const app = jsonServer.create(); //macht eine app
const router = jsonServer.router(path.join(__dirname, 'db.json')); // macht der router

app.db = router.db; // 2. WICHTIG: Die DB an die App binden für das Auth-Modul

/**
 * setzt alle variabeln ein
 */
app.use(cors());
app.use(jsonServer.defaults());
app.use(jsonServer.bodyParser);

// 3. Die Auth-Middleware VOR dem Router einbinden!
app.use(auth); 
//router einbinden
app.use(router);

//server lauft auf diesen port unter diese url
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ Auth-Server läuft auf http://localhost:${PORT}`);
});