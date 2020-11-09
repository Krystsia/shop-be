import {Client} from "pg";
import {dbOptions} from "./db/constants";

export const invokeHello = async () => {
  const client: Client = new Client(dbOptions)
  await client.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS todo_list (
        id serial PRIMARY KEY,
        list_name text,
        list_description text
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS todo_item (
        id serial PRIMARY KEY,
        list_id integer,
        item_name text,
        item_description text,
        FOREIGN KEY ("list_id") REFERENCES "todo_list" ("id")
      )
    `);

    await client.query(`
      INSERT INTO todo_list (list_name, list_description) VALUES
      ('Important', 'Important list to do'),
      ('Secondary', 'Minor matters')
    `);

    await client.query(`
      INSERT INTO todo_item (list_id, item_name, item_description) VALUES
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
