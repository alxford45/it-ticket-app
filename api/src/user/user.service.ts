import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

/* TODO: 
   - Implement remaining methods
   - Find solution to abstract SQL
*/
@Injectable()
export class UserService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  /* Working implementation  
     TODO: 
     - refactor table to match production table
     - hash password
  */
  async create(createUserDto: CreateUserDto) {
    const {
      firstname,
      lastname,
      lsuid,
      department,
      email,
      phone,
    } = createUserDto;

    /* Query user by email or username */
    const query = 'SELECT lsuid FROM students WHERE lsuid = $1';
    const queryRes = await this.connection.query(query, [lsuid]);

    /* Test to see if user exists */
    if (!!queryRes.rows[0]) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'LSUID already in system',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    /* Insert new user into db 
         TODO: implement error handling for pg request
      */
    const text =
      'INSERT INTO students VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [firstname, lastname, lsuid, department, email, phone];
    const res = (await this.connection.query<User>(text, values)).rows[0];

    /* Return user object without password */
    const user = new User();
    user.firstname = res.firstname;
    user.lastname = res.lastname;
    user.lsuid = res.lsuid;
    user.department = res.department;
    user.email = res.email;
    user.phone = res.phone;
    return user;
  }
  /* TODO */
  findAll() {
    return `This action returns all user`;
  }
  /* TODO */
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  /* TODO */
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  /* TODO */
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
