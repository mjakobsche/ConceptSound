import { Page } from "../model/Page"
import { executeQuery, executeCommand } from "../data/DbConnection"

async function save(page: Page) {
  const query = 'INSERT INTO pages (type, name, data, hidden) VALUES (?, ?, ?, ?)';
  const params = [page.type, page.name, page.data, page.hidden];
  await executeQuery(getQuery(query, params));
}

async function findAll() {
  let query = 'SELECT * FROM pages';
  let response: Page[] = await executeQuery(query) as unknown as Page[];
  return response;
}

async function findOne(id: number) {
  const query = 'SELECT * FROM pages WHERE id = ?';
  const params = [id];
  const response: Page | null = await executeQuery(getQuery(query, params)) as unknown as Page | null;
  return response;
}

async function update(page: Page) {
  const query = 'UPDATE pages SET type = ?, name = ?, data = ?, hidden = ? WHERE id = ?';
  const params = [page.type, page.name, page.data, page.hidden, page.id];
  await executeQuery(getQuery(query, params));
}

async function remove(id: number) {
  const query = 'DELETE FROM pages WHERE id = ?';
  const params = [id];
  await executeQuery(getQuery(query, params));
}

function getQuery(baseQuery: string, queryParams: any[]) {
  return baseQuery.replace(/\?/g, () => queryParams.shift()!.toString());
}

export { save, findAll, findOne, update, remove }
