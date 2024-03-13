import dotenv from 'dotenv';
import { knex, Knex } from 'knex';

dotenv.config();
const connect =  async() => {

  const data: Knex.Config = {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },

  };
  const k = knex(data)
  console.log("connected to database")

  const hasUsersTable = await k.schema.withSchema('DemoCreditApp').hasTable('users');
  if (!hasUsersTable) {
   await k.schema.withSchema('DemoCreditApp').createTable('users', function (table) {
     table.increments("Id").primary();
     table.string("Username");
     table.string("Password");
     table.string("AccountNo").checkRegex('[0-9]{10}');
     table.string('PhoneNumber').checkRegex('[0-9]{11}');
     table.integer("Balance");
    });
  }

  return k;

}
const Schema = connect ();

export default Schema;