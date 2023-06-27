import { createPool, sql as sqlObj, DatabasePool } from "slonik";
export { sql as sqlObj } from "slonik";

export const sql = sqlObj.unsafe;

let pool: DatabasePool;
export async function getPool() {
  if (pool === undefined) {
    pool = await createPool('postgres://postgres:123456@127.0.0.1/home_tasks');
  }
  return pool;
}
