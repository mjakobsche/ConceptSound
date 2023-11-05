import { Cover } from "../model/Cover"
import { executeQuery, executeCommand } from "../data/DbConnection"

async function save(cover: Cover) {
  const query = 'INSERT INTO covers (title, date) VALUES (?, ?)';
  const params = [cover.title, cover.date];
  await executeCommand(getQuery(query, params));
}

async function findAll() {
  let query = 'SELECT * FROM covers';
  let response: Cover[] = await executeQuery(query) as unknown as Cover[];
  return response;
}

async function findOne(id: number) {
  const query = 'SELECT * FROM covers WHERE id = ?';
  const params = [id];
  const response: Cover | null = await executeQuery(getQuery(query, params)) as unknown as Cover | null;
  return response;
}

async function update(cover: Cover) {
  const query = 'UPDATE covers SET title = ?, date = ? WHERE id = ?';
  const params = [cover.title, cover.date, cover.id];
  await executeCommand(getQuery(query, params));
}

async function remove(id: number) {
  const query = 'DELETE FROM covers WHERE id = ?';
  const params = [id];
  await executeCommand(getQuery(query, params));
}

function getQuery(baseQuery: string, queryParams: any[]) {
  return baseQuery.replace(/\?/g, () => queryParams.shift()!.toString());
}

export { save, findAll, findOne, update, remove }
