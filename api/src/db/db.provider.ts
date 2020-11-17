import { Provider } from "@nestjs/common";
import {Pool} from "pg";
import {PG_CONNECTION} from "../connection";

export const dbProvider: Provider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
        user: 'brvuirrqqcjzsb',
        host: 'ec2-54-158-190-214.compute-1.amazonaws.com',
        database: 'd3t7i9dt3u6h4g',
        password: '37f36b1e7cb6167c12f84c9e356c14535824e0a6c7e0dfe5fb71417f2be8d5b8',
        port: 5432,
        ssl: {
            rejectUnauthorized:false
        }
    })
};
