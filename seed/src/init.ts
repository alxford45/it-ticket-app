import { Client } from 'pg';
import {
  createCustomer,
  createTechnician,
  createTicket,
} from './queries/create_tables.queries';
import { dropAllTables } from './queries/drop_tables.queries';

/*
pgtyped provides typescript definitions for sql queries on local databases ONLY. 
1) Create local database:
    - postgres=# create database lsu_test;
    - postgres=# create user lsu_user with password 'password';
    - postgres=# grant all privileges on lsu_test to lsu_user;
    - postgres=# exit
2) Run init through package.json script onetime to initialize local database: 
    - yarn | npm run init
3) Run package.json codegen script to generate new functions: 
    - yarn | npm run codegen
*/

(async () => {
  const devConfig = {
    user: 'lsu_user',
    host: 'localhost',
    database: 'lsu_test',
    password: 'password',
    port: 5432,
  };
  const devClient = new Client(devConfig);

  await devClient.connect();
  /* queries without params must be of type and value void */
  const params: void = (() => {})();
  /* drop all tables */
  const drop = await dropAllTables.run(params, devClient);
  console.log(`tables dropped: ${!!drop}`);
  /* create all tables */
  const cust = await createCustomer.run(params, devClient);
  console.log(`table customer created: ${!!cust}`);
  const tech = await createTechnician.run(params, devClient);
  console.log(`table technician created: ${!!tech}`);
  const tick = await createTicket.run(params, devClient);
  console.log(`table ticket created: ${!!tick}`);

  process.exit(0);
})();
