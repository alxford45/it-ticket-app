import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateUser } from './dto/create-user.dto';
import { User, UserType } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  /* TODO: test implementation */
  async create(createCustomerDto: CreateUser) {
    const {
      lsu_id: lsuid,
      email,
      first_name: firstname,
      last_name: lastname,
      department,
      phone_number: phone,
      admin: admin,
    } = createCustomerDto;

    /* Query student by lsuid or email */
    const query = 'SELECT lsu_id FROM user WHERE lsu_id = $1 or email = $2';
    const queryRes = await this.connection.query(query, [lsuid, email]);

    /* Test to see if student exists */
    if (!!queryRes.rows[0]) {
      throw new HttpException(
        {
          error: 'LSUID and/or email already in system',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    /* Insert new student into db */
    const text =
      'INSERT INTO user (lsu_id, email, first_name, last_name, phone, department, admin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [
      lsuid,
      email,
      firstname,
      lastname,
      department,
      phone,
      admin,
    ];
    try {
      const res = await this.connection.query<User>(text, values);
      return res.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /* TODO: Test implementation */
  async findAll(userType: UserType) {
    let query;
    switch (userType) {
      case UserType.STUDENT:
        query = 'SELECT * FROM user WHERE admin = false';
        break;
      case UserType.ADMIN:
        query = 'SELECT * FROM user WHERE admin = true';
        break;
      default:
        query = 'SELECT * FROM user';
        break;
    }

    try {
      const queryRes = await this.connection.query<User>(query);
      /* If no users found return empty array */
      if (queryRes.rows.length < 1) {
        return [];
      }
      return [...queryRes.rows];
    } catch (error) {
      throw new HttpException(
        {
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /* TODO: Test implementation */
  async findOne(lsu_id: number) {
    try {
      const query = 'SELECT * FROM user WHERE lsu_id = $1';
      const queryRes = await this.connection.query<User>(query, [lsu_id]);

      /* If customer not found return empty object */
      if (queryRes.rows.length < 1) {
        return {};
      }

      return queryRes.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
