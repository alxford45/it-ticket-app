/** Types generated for queries found in "./src/sql/create_tables.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CreateCustomer' parameters type */
export type ICreateCustomerParams = void;

/** 'CreateCustomer' return type */
export type ICreateCustomerResult = void;

/** 'CreateCustomer' query type */
export interface ICreateCustomerQuery {
  params: ICreateCustomerParams;
  result: ICreateCustomerResult;
}

const createCustomerIR: any = {"name":"createCustomer","params":[],"usedParamSet":{},"statement":{"body":"CREATE TABLE IF NOT EXISTS customer (\n        lsu_id integer NOT NULL,\n        first_name varchar(45) NOT NULL,\n        last_name varchar(45) NOT NULL,\n        email varchar(100) NOT NULL,\n        password varchar(450) NOT NULL,\n        phone_number BigInt NOT NULL,\n        department varchar(50) NOT NULL,\n        PRIMARY KEY (lsu_id)\n    )","loc":{"a":27,"b":368,"line":4,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * CREATE TABLE IF NOT EXISTS customer (
 *         lsu_id integer NOT NULL,
 *         first_name varchar(45) NOT NULL,
 *         last_name varchar(45) NOT NULL,
 *         email varchar(100) NOT NULL,
 *         password varchar(450) NOT NULL,
 *         phone_number BigInt NOT NULL,
 *         department varchar(50) NOT NULL,
 *         PRIMARY KEY (lsu_id)
 *     )
 * ```
 */
export const createCustomer = new PreparedQuery<ICreateCustomerParams,ICreateCustomerResult>(createCustomerIR);


/** 'CreateTechnician' parameters type */
export type ICreateTechnicianParams = void;

/** 'CreateTechnician' return type */
export type ICreateTechnicianResult = void;

/** 'CreateTechnician' query type */
export interface ICreateTechnicianQuery {
  params: ICreateTechnicianParams;
  result: ICreateTechnicianResult;
}

const createTechnicianIR: any = {"name":"createTechnician","params":[],"usedParamSet":{},"statement":{"body":"CREATE TABLE IF NOT EXISTS technician (\n        lsu_id integer NOT NULL,\n        first_name varchar(45) NOT NULL,\n        last_name varchar(45) NOT NULL,\n        email varchar(100) NOT NULL,\n        password varchar(450) NOT NULL,\n        phone_number BigInt NOT NULL,\n        PRIMARY KEY (lsu_id)\n    )","loc":{"a":401,"b":703,"line":18,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * CREATE TABLE IF NOT EXISTS technician (
 *         lsu_id integer NOT NULL,
 *         first_name varchar(45) NOT NULL,
 *         last_name varchar(45) NOT NULL,
 *         email varchar(100) NOT NULL,
 *         password varchar(450) NOT NULL,
 *         phone_number BigInt NOT NULL,
 *         PRIMARY KEY (lsu_id)
 *     )
 * ```
 */
export const createTechnician = new PreparedQuery<ICreateTechnicianParams,ICreateTechnicianResult>(createTechnicianIR);


/** 'CreateTicket' parameters type */
export type ICreateTicketParams = void;

/** 'CreateTicket' return type */
export type ICreateTicketResult = void;

/** 'CreateTicket' query type */
export interface ICreateTicketQuery {
  params: ICreateTicketParams;
  result: ICreateTicketResult;
}

const createTicketIR: any = {"name":"createTicket","params":[],"usedParamSet":{},"statement":{"body":"CREATE TABLE IF NOT EXISTS ticket (\n      ticket_id SERIAL PRIMARY KEY,\n      priority integer NOT NULL,\n      status varchar(20) NOT NULL,\n      category varchar(50) NOT NULL,\n      description varchar(500) NOT NULL,\n      device varchar(50) NOT NULL,\n      os varchar(20) NOT NULL,\n      os_version varchar(50) NOT NULL\n    )","loc":{"a":736,"b":1062,"line":31,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * CREATE TABLE IF NOT EXISTS ticket (
 *       ticket_id SERIAL PRIMARY KEY,
 *       priority integer NOT NULL,
 *       status varchar(20) NOT NULL,
 *       category varchar(50) NOT NULL,
 *       description varchar(500) NOT NULL,
 *       device varchar(50) NOT NULL,
 *       os varchar(20) NOT NULL,
 *       os_version varchar(50) NOT NULL
 *     )
 * ```
 */
export const createTicket = new PreparedQuery<ICreateTicketParams,ICreateTicketResult>(createTicketIR);


