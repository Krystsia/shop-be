import {Client} from "pg";
import {dbOptions} from "./constants";


export const getProductByIdFromDb = async (productId: string) => {

  console.log('Incoming productId', productId)

  const client: Client = new Client(dbOptions)
  await client.connect();

  try {
    const result = await client.query(`
      SELECT count, price, title, description FROM products
        LEFT JOIN stocks ON products.id = stocks.product_id
        WHERE products.id = '${productId}';
    `);

    return result;
  } catch (err) {
    console.log('Error during products request execution', err)
    throw err;
  } finally {
    await client.end();
  }
}
