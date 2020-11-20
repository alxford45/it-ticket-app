/** Types generated for queries found in "./src/sql/drop_tables.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'DropAllTables' parameters type */
export type IDropAllTablesParams = void;

/** 'DropAllTables' return type */
export type IDropAllTablesResult = void;

/** 'DropAllTables' query type */
export interface IDropAllTablesQuery {
  params: IDropAllTablesParams;
  result: IDropAllTablesResult;
}

const dropAllTablesIR: any = {"name":"dropAllTables","params":[],"usedParamSet":{},"statement":{"body":"DROP TABLE IF EXISTS customer, technician, ticket","loc":{"a":26,"b":74,"line":4,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * DROP TABLE IF EXISTS customer, technician, ticket
 * ```
 */
export const dropAllTables = new PreparedQuery<IDropAllTablesParams,IDropAllTablesResult>(dropAllTablesIR);


