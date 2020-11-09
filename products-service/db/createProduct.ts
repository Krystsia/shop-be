import {Client} from "pg";
import {dbOptions} from "./constants";
import {getAllProductsFromDb} from "./getAllProducts";


export const createProductInDb = async (product) => {
  const client: Client = new Client(dbOptions)
  await client.connect();

  try {
    await client.query(`
      INSERT INTO products (title, description, price) VALUES
      ('${product.title}', '${product.description}', ${product.price})
    `);

    return getAllProductsFromDb();
  } catch (err) {
    console.log('Error during products request execution', err)
    throw err;
  } finally {
    await client.end();
  }
}
