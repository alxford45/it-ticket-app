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
  constructor(@Inject(PG_CONNECTION) private connection: Pool){}

  /* Working implementation  
     TODO: 
     - refactor table to match production table
     - hash password
  */
  async create(createUserDto: CreateUserDto) {
      const {username, email, password} = createUserDto;

      /* Query user by email or username */
      const query = 'SELECT id FROM users_test WHERE username = $1 or email = $2';
      const queryRes = await this.connection.query(query, [username, email]);

      /* Test to see if user exists */
      if(!!queryRes.rows[0]) {
        throw new HttpException({status:HttpStatus.BAD_REQUEST, error: 'Username and email must be unique.'}, HttpStatus.FORBIDDEN);
      }

      /* Insert new user into db 
         TODO: implement error handling for pg request
      */
      const text = 'INSERT INTO users_test(username, email, password) VALUES ($1, $2, $3) RETURNING *';
      const values = [username, email, password];
      const res  =  (await this.connection.query<User>(text, values)).rows[0];

      /* Return user object without password */
      const user = new User();
      user.email = res.email;
      user.id = res.id;
      user.username = res.username;
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
