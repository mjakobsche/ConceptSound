import { SQLiteHook, SQLiteDBConnection, useSQLite } from "vue-sqlite-hook";

const sqlite: SQLiteHook = useSQLite();

async function getConnection(readOnly: boolean) {
  let dbConnection: SQLiteDBConnection;
  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection("library_db", readOnly)).result;
  if (ret.result && isConn) {
    dbConnection = await sqlite.retrieveConnection("library_db", readOnly);
  } else {
    dbConnection = await sqlite.createConnection(
      "library_db",
      false,
      "no-encryption",
      1,
      readOnly,
    );
  }
  return dbConnection;
}

async function executeQuery(query: string) {
  const dbConnection = await getConnection(true);
  await dbConnection.open();
  const response = await dbConnection.query(query);
  await dbConnection.close();
  return response;
}

async function executeCommand(command: string) {
  const dbConnection = await getConnection(false);
  await dbConnection.open();
  const response = await dbConnection.execute(command);
  await dbConnection.close();
  return response;
}

export { executeQuery, executeCommand }
