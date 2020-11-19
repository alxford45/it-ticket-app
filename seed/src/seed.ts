import {
  genRandomDepartment,
  genRandomName,
  genRandomNumber,
} from './generator';
import {
  ISeedCustomerParams,
  ISeedTechnicianParams,
  ISeedTicketParams,
} from './queries/seed_tables.queries';

type Customer = ISeedCustomerParams['customers'][0];
type Technician = ISeedTechnicianParams['technicians'][0];
type Ticket = ISeedTicketParams['tickets'][0];

const baseLsuId = 890000000;

export const getCustomers = () => {
  const customers: ISeedCustomerParams = {
    customers: new Array<Customer>(20).fill(null).map(() => {
      const name = genRandomName();
      return {
        first_name: name.first,
        last_name: name.last,
        email: name.first[0] + name.last + genRandomNumber(1, 99) + '@lsu.edu',
        lsu_id: baseLsuId + genRandomNumber(1000000, 9999999),
        department: genRandomDepartment(),
        password: 'password',
        phone_number: genRandomNumber(1110000000, 9999999999),
      } as Customer;
    }),
  };
  return customers;
};

export const getTechnicians = () => {
  const technicians: ISeedTechnicianParams = {
    technicians: new Array<Technician>(10).fill(null).map(() => {
      const name = genRandomName();
      return {
        first_name: name.first,
        last_name: name.last,
        email: name.first[0] + name.last + genRandomNumber(1, 99) + '@lsu.edu',
        lsu_id: baseLsuId + genRandomNumber(1000000, 9999999),
        password: 'password',
        phone_number: genRandomNumber(1110000000, 9999999999),
      } as Technician;
    }),
  };
  return technicians;
};

export const getTickets = () => {
  const tickets: ISeedTicketParams = {
    tickets: new Array<Ticket>(5).fill(null).map(() => {
      return {
        status: 'opened',
        category: 'bug',
        description: 'too lazy for description',
        os: 'Windows',
        os_version: '10',
        device: 'laptop',
        priority: 0,
      } as Ticket;
    }),
  };
  return tickets;
};
