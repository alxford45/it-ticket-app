import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateTicketWorkDto } from './dto/create-ticketwork.dto';
import { UpdateTicketWorkDto } from './dto/update-ticketwork.dto';
import { TicketWork } from './entities/ticketwork.entity';

/* TODO: 
   - Implement remaining methods
   - Find solution to abstract SQL
*/
@Injectable()
export class TicketWorkService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  async create(createTicketWorkDto: CreateTicketWorkDto) {
    const {
      issue,
      component,
      description,
      starttime,
      endtime
    } = createTicketWorkDto;

    /* Insert new user into db 
         TODO: implement error handling for pg request
      */
    const text =
      'INSERT INTO ticketwork(issue, component, description, starttime, endtime) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [issue, component, description, starttime, endtime];
    const res = (await this.connection.query<TicketWork>(text, values)).rows[0];

    /* Return user object without password */
    const ticketwork = new TicketWork();
    ticketwork.issue = res.issue;
    ticketwork.component = res.component;
    ticketwork.description = res.description;
    ticketwork.starttime = res.starttime;
    ticketwork.endtime = res.endtime;
    return ticketwork;
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
  update(id: number, updateTicketWorkDto: UpdateTicketWorkDto) {
    return `This action updates a #${id} user`;
  }
  /* TODO */
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
