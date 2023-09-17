import {createApp} from "vue";
import {createPinia} from "pinia";
import App from "./App.vue";
import router from "./router";

import {IonicVue} from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import BookPageText from "./components/BookPageText.vue";
import BookWorkshopText from "./components/BookWorkshopText.vue";
import BookWorkshopAudio from "./components/BookWorkshopAudio.vue";
import BookPageAudio from "./components/BookPageAudio.vue";
import BookPagePhoto from "./components/BookPagePhoto.vue";
import BookWorkshopPhoto from "./components/BookWorkshopPhoto.vue";
import BookPageScore from "./components/BookPageScore.vue";
import BookWorkshopScore from "./components/BookWorkshopScore.vue";
import {applyPolyfills, defineCustomElements as jeepSqlite} from "jeep-sqlite/loader";
import {useState} from "@/composables/state";
import {Capacitor} from "@capacitor/core";
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from "@capacitor-community/sqlite";

applyPolyfills().then(() => {
    jeepSqlite(window);
});

const platform = Capacitor.getPlatform();
const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)

const pinia = createPinia();
const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(pinia)
    .component("BookPageText", BookPageText)
    .component("BookWorkshopText", BookWorkshopText)
    .component("BookPageAudio", BookPageAudio)
    .component("BookWorkshopAudio", BookWorkshopAudio)
    .component("BookPagePhoto", BookPagePhoto)
    .component("BookWorkshopPhoto", BookWorkshopPhoto)
    .component("BookPageScore", BookPageScore)
    .component("BookWorkshopScore", BookWorkshopScore);

//  Existing Connections Store
const [existConn, setExistConn] = useState(false);
app.config.globalProperties.$existingConn = {existConn: existConn, setExistConn: setExistConn};

if (platform === "web") {
    // Create the 'jeep-sqlite' Stencil component
    const jeepSqlite = document.createElement('jeep-sqlite');
    document.body.appendChild(jeepSqlite);
    await customElements.whenDefined('jeep-sqlite');
    // Initialize the Web store
    await sqlite.initWebStore();
}

const ret = await sqlite.checkConnectionsConsistency();
const isConn = (await sqlite.isConnection("library_db")).result;
let db: SQLiteDBConnection
if (ret.result && isConn) {
    db = await sqlite.retrieveConnection("library_db");
} else {
    db = await sqlite.createConnection("library_db", false, "no-encryption", 1);
}
await db.open();
const query = `
CREATE TABLE IF NOT EXISTS covers (
    id INTEGER PRIMARY KEY,
    title NVARCHAR(50),
    date DATETIME
);
CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY,
    bookId INTEGER,
    number INTEGER UNIQUE,
    hidden BOOLEAN,
    type VARCHAR(15),
    name NVARCHAR(50),
    data TEXT,
    FOREIGN KEY(bookId) REFERENCES covers(id)
);
    `
let res = await db.execute(query);
if (res.changes && res.changes.changes && res.changes.changes < 0) {
    throw new Error(`Error: execute failed`);
}

res = await db.execute("INSERT INTO covers (title) VALUES ('testujemy')");

res = await db.query('SELECT * FROM covers');
console.log(res);
await sqlite.closeConnection("library_db");

router.isReady().then(() => {
    app.mount("#app");
});
