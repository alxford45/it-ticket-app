/** Types generated for queries found in "./src/sql/seed_tables.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'SeedCustomer' parameters type */
export interface ISeedCustomerParams {
  customers: Array<{
    lsu_id: number | null | void,
    first_name: string | null | void,
    last_name: string | null | void,
    email: string | null | void,
    password: string | null | void,
    phone_number: number | null | void,
    department: string | null | void
  }>;
}

/** 'SeedCustomer' return type */
export interface ISeedCustomerResult {
  lsu_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: number;
  department: string;
}

/** 'SeedCustomer' query type */
export interface ISeedCustomerQuery {
  params: ISeedCustomerParams;
  result: ISeedCustomerResult;
}

const seedCustomerIR: any = {"name":"seedCustomer","params":[{"name":"customers","codeRefs":{"defined":{"a":29,"b":37,"line":3,"col":7},"used":[{"a":259,"b":267,"line":13,"col":10}]},"transform":{"type":"pick_array_spread","keys":["lsu_id","first_name","last_name","email","password","phone_number","department"]}}],"usedParamSet":{"customers":true},"statement":{"body":"INSERT INTO customer (\n    lsu_id,\n    first_name,\n    last_name,\n    email,\n    password,\n    phone_number,\n    department\n) VALUES :customers RETURNING *","loc":{"a":125,"b":279,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO customer (
 *     lsu_id,
 *     first_name,
 *     last_name,
 *     email,
 *     password,
 *     phone_number,
 *     department
 * ) VALUES :customers RETURNING *
 * ```
 */
export const seedCustomer = new PreparedQuery<ISeedCustomerParams,ISeedCustomerResult>(seedCustomerIR);


/** 'GetAllCustomers' parameters type */
export type IGetAllCustomersParams = void;

/** 'GetAllCustomers' return type */
export interface IGetAllCustomersResult {
  lsu_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: number;
  department: string;
}

/** 'GetAllCustomers' query type */
export interface IGetAllCustomersQuery {
  params: IGetAllCustomersParams;
  result: IGetAllCustomersResult;
}

const getAllCustomersIR: any = {"name":"getAllCustomers","params":[],"usedParamSet":{},"statement":{"body":"SELECT * FROM customer","loc":{"a":311,"b":332,"line":18,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM customer
 * ```
 */
export const getAllCustomers = new PreparedQuery<IGetAllCustomersParams,IGetAllCustomersResult>(getAllCustomersIR);


/** 'SeedTechnician' parameters type */
export interface ISeedTechnicianParams {
  technicians: Array<{
    lsu_id: number | null | void,
    first_name: string | null | void,
    last_name: string | null | void,
    email: string | null | void,
    password: string | null | void,
    phone_number: number | null | void
  }>;
}

/** 'SeedTechnician' return type */
export interface ISeedTechnicianResult {
  lsu_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: number;
}

/** 'SeedTechnician' query type */
export interface ISeedTechnicianQuery {
  params: ISeedTechnicianParams;
  result: ISeedTechnicianResult;
}

const seedTechnicianIR: any = {"name":"seedTechnician","params":[{"name":"technicians","codeRefs":{"defined":{"a":367,"b":377,"line":22,"col":7},"used":[{"a":573,"b":583,"line":31,"col":10}]},"transform":{"type":"pick_array_spread","keys":["lsu_id","first_name","last_name","email","password","phone_number"]}}],"usedParamSet":{"technicians":true},"statement":{"body":"INSERT INTO technician (\n    lsu_id,\n    first_name,\n    last_name,\n    email,\n    password,\n    phone_number\n) VALUES :technicians RETURNING *","loc":{"a":453,"b":595,"line":24,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO technician (
 *     lsu_id,
 *     first_name,
 *     last_name,
 *     email,
 *     password,
 *     phone_number
 * ) VALUES :technicians RETURNING *
 * ```
 */
export const seedTechnician = new PreparedQuery<ISeedTechnicianParams,ISeedTechnicianResult>(seedTechnicianIR);


/** 'GetAllTechnicians' parameters type */
export type IGetAllTechniciansParams = void;

/** 'GetAllTechnicians' return type */
export interface IGetAllTechniciansResult {
  lsu_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: number;
}

/** 'GetAllTechnicians' query type */
export interface IGetAllTechniciansQuery {
  params: IGetAllTechniciansParams;
  result: IGetAllTechniciansResult;
}

const getAllTechniciansIR: any = {"name":"getAllTechnicians","params":[],"usedParamSet":{},"statement":{"body":"SELECT * FROM technician","loc":{"a":629,"b":652,"line":36,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM technician
 * ```
 */
export const getAllTechnicians = new PreparedQuery<IGetAllTechniciansParams,IGetAllTechniciansResult>(getAllTechniciansIR);


/** 'SeedTicket' parameters type */
export interface ISeedTicketParams {
  tickets: Array<{
    priority: number | null | void,
    status: string | null | void,
    category: string | null | void,
    description: string | null | void,
    device: string | null | void,
    os: string | null | void,
    os_version: string | null | void
  }>;
}

/** 'SeedTicket' return type */
export interface ISeedTicketResult {
  ticket_id: number;
  priority: number;
  status: string;
  category: string;
  description: string;
  device: string;
  os: string;
  os_version: string;
}

/** 'SeedTicket' query type */
export interface ISeedTicketQuery {
  params: ISeedTicketParams;
  result: ISeedTicketResult;
}

const seedTicketIR: any = {"name":"seedTicket","params":[{"name":"tickets","codeRefs":{"defined":{"a":683,"b":689,"line":40,"col":7},"used":[{"a":893,"b":899,"line":51,"col":10}]},"transform":{"type":"pick_array_spread","keys":["priority","status","category","description","device","os","os_version"]}}],"usedParamSet":{"tickets":true},"statement":{"body":"INSERT INTO ticket (\n    priority,\n    status,\n    category,\n    description,\n    device,\n    os,\n    os_version\n) VALUES :tickets RETURNING *","loc":{"a":770,"b":911,"line":43,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO ticket (
 *     priority,
 *     status,
 *     category,
 *     description,
 *     device,
 *     os,
 *     os_version
 * ) VALUES :tickets RETURNING *
 * ```
 */
export const seedTicket = new PreparedQuery<ISeedTicketParams,ISeedTicketResult>(seedTicketIR);


/** 'GetAllTickets' parameters type */
export type IGetAllTicketsParams = void;

/** 'GetAllTickets' return type */
export interface IGetAllTicketsResult {
  ticket_id: number;
  priority: number;
  status: string;
  category: string;
  description: string;
  device: string;
  os: string;
  os_version: string;
}

/** 'GetAllTickets' query type */
export interface IGetAllTicketsQuery {
  params: IGetAllTicketsParams;
  result: IGetAllTicketsResult;
}

const getAllTicketsIR: any = {"name":"getAllTickets","params":[],"usedParamSet":{},"statement":{"body":"SELECT * FROM ticket","loc":{"a":941,"b":960,"line":56,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM ticket
 * ```
 */
export const getAllTickets = new PreparedQuery<IGetAllTicketsParams,IGetAllTicketsResult>(getAllTicketsIR);


