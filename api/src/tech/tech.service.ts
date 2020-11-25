import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';
import { Tech } from './entities/tech.entity';

/* TODO: 
   - Implement remaining methods
   - Find solution to abstract SQL
*/
@Injectable()
export class TechService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  /* Working implementation  
     TODO: 
     - refactor table to match production table
     - hash password
  */
  async create(createTechDto: CreateTechDto) {
    // TODO: CREATE USER WITH ADMIN FLAG == TRUE (FOR CREATE NEW TECH SIDEBAR ON TECH PAGE)
    const { firstname, lastname, lsuid, email, phone } = createTechDto;

    /* Query user by email or username */
    const query = 'SELECT id FROM tech WHERE lsuid = $1';
    const queryRes = await this.connection.query(query, [lsuid]);

    /* Test to see if user exists */
    if (!!queryRes.rows[0]) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'LSUID already in use' },
        HttpStatus.FORBIDDEN,
      );
    }

    /* Insert new user into db 
         TODO: implement error handling for pg request
      */
    const text = 'INSERT INTO tech VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [firstname, lastname, lsuid, email, lsuid, phone];
    const res = (await this.connection.query<Tech>(text, values)).rows[0];

    /* Return user object without password */
    const tech = new Tech();
    tech.firstname = res.firstname;
    tech.lastname = res.lastname;
    tech.lsuid = res.lsuid;
    tech.email = res.email;
    tech.phone = res.phone;
    return tech;
  }
  /* TODO */
  findAll() {
    // TODO: SELECT * FROM USER WHERE ADMIN = TRUE; (SELECT TECH PAGE)
    return `This action returns all user`;
  }
  /* TODO */
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  /* TODO */
  update(id: number, updateTechDto: UpdateTechDto) {
    return `This action updates a #${id} user`;
  }
  /* TODO */
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
