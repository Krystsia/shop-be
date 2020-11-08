import { Client } from "pg";
import { dbOptions } from './constants';

export const invoke = async () => {
  const client: Client = new Client(dbOptions)
  await client.connect();

  try {
    const ddlSetExtension = await client.query(`
      create extension if not exists "uuid-ossp"
    `)

    const ddlResult = await client.query(`
      create table if not exists products (
        id uuid DEFAULT uuid_generate_v4(),
        title text not null,
        description text,
        price integer,
        PRIMARY KEY (id)
      )
    `);

    const ddlResult2 = await client.query(`
      create table if not exists stocks (
        id uuid DEFAULT uuid_generate_v4(),
        product_id uuid,
        count integer,
        foreign key (product_id) references products (id),
        PRIMARY KEY (id)
      )
    `)

    const dmlResult = await client.query(`
      insert into products (title, description, price) values
      ('Product Title 1', 'This product ...', 200),
      ('Product Title 1', 'This product ...', 300)
    `);


    const dmlResult2 = await client.query(`
      insert into stocks (count, product_id) values
      (4, '79bf3aac-1b06-4e5a-8c38-e0aab1c08d5a'),
      (6, '8282c1ad-02bb-494a-9e06-8bec41e6fcd5')
    `);


    const {rows: products} = await client.query(`select * from products`)
    console.log(products);

  } catch (err) {
    console.log('Error during database request execution', err);

  } finally {
    await client.end();
  }
}

