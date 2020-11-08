import {Client} from "pg";
import {dbOptions} from "./constants";

export const getAllProducts = async () => {
  const client: Client = new Client(dbOptions)
  await client.connect();

  try {
    return await client.query(`
      select * from products
    `)
  } catch (err) {
    console.log('Error during products request execution', err)
    throw err;
  } finally {
    await client.end();
  }
}
