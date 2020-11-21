import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  /* TODO: test implementation */
  async create(createUserDto: CreateCustomerDto) {
    const {
      lsu_id,
      email,
      first_name,
      last_name,
      phone_number,
      department,
    } = createUserDto;

    /* Query user by email or username */
    const query = 'SELECT * FROM customers WHERE email = $1 or lsu_id = $2';
    const queryRes = await this.connection.query(query, [email, lsu_id]);

    /* Test to see if user exists */
    if (!!queryRes.rows[0]) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email and lsu id must be unique.',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    /* Insert new user into db */
    const text =
      'INSERT INTO customers (lsu_id, email, first_name, last_name, phone_number, department,  ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [
      lsu_id,
      email,
      first_name,
      last_name,
      phone_number,
      department,
    ];
    try {
      const res = await this.connection.query<Customer>(text, values);
      return res.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: error,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
  /* TODO: Test implementation */
  async findAll() {
    try {
      const query = 'SELECT * FROM customers';
      const queryRes = await this.connection.query<Customer>(query);

      /* If no customers found return empty array */
      if (queryRes.rows.length < 1 || !queryRes.rows[0].lsu_id) {
        return [];
      }

      return [...queryRes.rows];
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: error,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
  /* TODO: Test implementation */
  async findOne(lsu_id: number) {
    try {
      const query = 'SELECT * FROM customers WHERE lsu_id = $1';
      const queryRes = await this.connection.query<Customer>(query, [lsu_id]);

      /* If customer not found return empty object */
      if (queryRes.rows.length < 1) {
        return {};
      }

      return queryRes.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: error,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
