import { Client } from "pg";
import { dbOptions } from './constants';

export const invoke = async () => {
  const client: Client = new Client(dbOptions)
  await client.connect();

  try {
    await client.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id uuid DEFAULT uuid_generate_v4(),
        title text not null,
        description text,
        price integer,
        PRIMARY KEY (id)
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS stocks (
        id uuid DEFAULT uuid_generate_v4(),
        product_id uuid,
        count integer,
        FOREIGN KEY (product_id) REFERENCES products (id),
        PRIMARY KEY (id)
      )
    `)

    await client.query(`
      INSERT INTO products (title, description, price) VALUES
      ('Product Title 1', 'This product ...', 200),
      ('Product Title 1', 'This product ...', 300)
    `);


    await client.query(`
      INSERT INTO stocks (count, product_id) VALUES
      (4, '79bf3aac-1b06-4e5a-8c38-e0aab1c08d5a'),
      (6, '8282c1ad-02bb-494a-9e06-8bec41e6fcd5')
    `);

    const {rows: products} = await client.query(`SELECT * FROM products`)
    console.log(products);

  } catch (err) {
    console.log('Error during database request execution', err);
  } finally {
    await client.end();
  }
}

