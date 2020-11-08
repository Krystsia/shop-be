import {Client, ClientConfig} from "pg";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD} = process.env;
const dbOptions: ClientConfig = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
}

export const invoke = async () => {
  const client: Client = new Client(dbOptions)
  await client.connect();

  try {
    const ddlResult = await client.query(`
      create table if not exists todo_list (
        id serial primary key,
        list_name text,
        list_description text
      )
    `);

    const ddlResult2 = await client.query(`
      create table if not exists todo_item (
        id serial primary key,
        list_id integer,
        item_name text,
        item_description text,
        foreign key ("list_id") references "todo_list" ("id")
      )
    `);

    const dmlResult = await client.query(`
      insert into todo_list (list_name, list_description) values
      ('Important', 'Important list to do'),
      ('Secondary', 'Minor matters')
    `);

    const dmlResult1 = await client.query(`
      insert into todo_item (list_id, item_name, item_description) values
      (1, 'Learn Lambda', 'Learn how to work with Amazon Lambda'),
      (1, 'Learn Lambda', 'Learn how to work with Amazon RDS'),
      (2, 'Learn IDE shortcuts', 'Learn how to work with shortcuts in DataGrip')
    `);


    const { rows: todo_items } = await client.query(`select * from todo_item`)
    console.log(todo_items);

  } catch (err) {
    console.log('Error during database request execution', err);

  } finally {
    await client.end();
  }
}
