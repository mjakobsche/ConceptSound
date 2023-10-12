import { Cover } from "../model/Cover"
import { executeQuery, executeCommand } from "../data/DbConnection"

async function findAll() {
  let query = 'SELECT * FROM covers';
  let response: Cover[] = await executeQuery(query) as unknown as Cover[];
  return response;
}

export { findAll }
