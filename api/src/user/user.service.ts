import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Pool, QueryConfig } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { User, UserType } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  /* WORKING implementation */
  async create(createUser: CreateUser) {
    const {
      lsu_id,
      email,
      first_name,
      last_name,
      phone_number,
      department,
      admin,
    } = createUser;

    const findQuery: QueryConfig = {
      name: 'select_user_by_id_or_email',
      text: 'SELECT lsu_id FROM "user" WHERE lsu_id = $1 OR email = $2',
      values: [lsu_id, email],
    };
    try {
      /* Query student by lsuid or email */
      const queryRes = await this.connection.query(findQuery);

      /* Test to see if student exists */
      if (queryRes.rows.length > 0) {
        /*Throw custom error to be handled in catch*/
        throw new Error('BAD_REQUEST');
      }
    } catch (error) {
      /* Catch custom error if user exists
         Then throw Bad Request HttpException
       */
      if (error.message === 'BAD_REQUEST') {
        throw new HttpException(
          {
            error: 'LSUID and/or email already in system',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      /* Catch postgres error and throw Internal Error HttpException */
      throw new HttpException(
        {
          message: findQuery,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    /* Insert new student into db */
    const insertQuery: QueryConfig = {
      name: 'insert_user',

      text:
        'INSERT INTO "user" (lsu_id, email, first_name, last_name, phone_number, department, admin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [
        lsu_id,
        email,
        first_name,
        last_name,
        phone_number,
        department,
        admin,
      ],
    };
    try {
      const res = await this.connection.query<User>(insertQuery);
      return res.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          message: insertQuery,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /* WORKING implementation */
  async findAll(userType: UserType) {
    let query: QueryConfig;
    switch (userType) {
      case UserType.STUDENT:
        query = {
          name: 'select_all_students',
          text: 'SELECT * FROM "user" WHERE admin = false',
        };
        break;
      case UserType.ADMIN:
        query = {
          name: 'select_all_admin',
          text: 'SELECT * FROM "user" WHERE admin = true',
        };
        break;
      default:
        query = { name: 'select_all_users', text: 'SELECT * FROM "user"' };
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
          message: query,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /* WORKING implementation */
  async findOne(lsu_id: number) {
    const query = {
      name: 'select_user_by_id',
      text: 'SELECT * FROM "user" WHERE "lsu_id" = $1',
    };
    try {
      const queryRes = await this.connection.query<User>(query, [lsu_id]);
      /* If customer not found return empty object */
      if (queryRes.rows.length < 1) {
        return {};
      }

      return queryRes.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          message: query,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* WORKING implementation */
  async update(updateUser: UpdateUser, old_lsu_id: number) {
    const {
      lsu_id,
      email,
      first_name,
      last_name,
      phone_number,
      department,
      admin,
    } = updateUser;

    const findQuery: QueryConfig = {
      name: 'select_user_by_id',
      text: 'SELECT lsu_id FROM "user" WHERE lsu_id = $1',
      values: [old_lsu_id],
    };
    try {
      const res = await this.connection.query(findQuery);

      /* Test to see if student exists */
      if (res.rows.length < 1) {
        /*Throw custom error to be handled in catch*/
        throw new Error('BAD_REQUEST');
      }
    } catch (error) {
      /* Catch custom error if user does not exist
         Then throw Bad Request HttpException
       */
      if (error.message === 'BAD_REQUEST') {
        throw new HttpException(
          {
            error: `User with lsu_id ${lsu_id} DOES NOT EXIST`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      /* Catch postgres error and throw Internal Error HttpException */
      throw new HttpException(
        {
          message: findQuery,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    /* Update user in db */
    const updateQuery: QueryConfig = {
      name: 'update_user',

      text:
        'UPDATE "user" SET lsu_id = $1, email = $2, first_name = $3, last_name = $4, phone_number = $5, department = $6, admin = $7 WHERE lsu_id = $8 RETURNING *',
      values: [
        lsu_id,
        email,
        first_name,
        last_name,
        phone_number,
        department,
        admin,
        old_lsu_id,
      ],
    };
    try {
      const res = await this.connection.query<User>(updateQuery);
      return res.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          message: updateQuery,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
