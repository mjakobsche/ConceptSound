 
import {getCurrentInstance} from "vue";
import {SQLiteHook, SQLiteDBConnection} from "vue-sqlite-hook";

const app = getCurrentInstance();
if (app == null) {
  throw new Error("could not initialize app!");
}
const sqlite: SQLiteHook = app.appContext.config.globalProperties.$sqlite;

let db: SQLiteDBConnection;
 
async function getConnection(){
  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection("library_db", false)).result;
  if (ret.result && isConn) {
    db = await sqlite.retrieveConnection("library_db", false);
  } else {
    db = await sqlite.createConnection(
      "library_db",
      false,
      "no-encryption",
      1,
      false,
    );
  }
}

function executeQuery(query: string){

}
function executeCommand(command: string){
  
}
