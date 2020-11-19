import { Client } from 'pg';
import {
  createCustomer,
  createTechnician,
  createTicket,
} from './queries/create_tables.queries';

import { dropAllTables } from './queries/drop_tables.queries';
import {
  seedCustomer,
  seedTechnician,
  seedTicket,
} from './queries/seed_tables.queries';
import { getCustomers, getTechnicians, getTickets } from './seed';

(async () => {
  const prodConfig = {
    user: 'brvuirrqqcjzsb',
    host: 'ec2-54-158-190-214.compute-1.amazonaws.com',
    database: 'd3t7i9dt3u6h4g',
    password:
      '37f36b1e7cb6167c12f84c9e356c14535824e0a6c7e0dfe5fb71417f2be8d5b8',
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  };
  const prodClient = new Client(prodConfig);

  const devConfig = {
    user: 'lsu_user',
    host: 'localhost',
    database: 'lsu_test',
    password: 'password',
    port: 5432,
  };

  await prodClient.connect();

  const params: void = (() => {})();
  console.log('dropping tables...');
  const drop = await dropAllTables.run(params, prodClient);
  console.log(`tables dropped: ${!!drop}`);

  console.log('Creating tables...');
  const cust = await createCustomer.run(params, prodClient);
  console.log(`table customer created: ${!!cust}`);
  const tech = await createTechnician.run(params, prodClient);
  console.log(`table technician created: ${!!tech}`);
  const tick = await createTicket.run(params, prodClient);
  console.log(`table ticket created: ${!!tick}`);

  console.log('Seeding tables...');

  const customers = getCustomers();
  const customerResults = await seedCustomer.run(customers, prodClient);
  console.log(customerResults);
  console.log('Customers Seeded!');

  const technicians = getTechnicians();
  const technicianResults = await seedTechnician.run(technicians, prodClient);
  console.log(technicianResults);
  console.log('Technicians Seededs!');

  const tickets = getTickets();
  const ticketResults = await seedTicket.run(tickets, prodClient);
  console.log(ticketResults);
  console.log('Tickets Seeded!');

  process.exit(0);
})();
