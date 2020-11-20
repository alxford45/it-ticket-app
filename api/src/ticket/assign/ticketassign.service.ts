import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateTicketAssignDto } from './dto/create-ticketassign.dto';
import { UpdateTicketAssignDto } from './dto/update-ticketassign.dto';
import { TicketAssign } from './entities/ticketassign.entity';

/* TODO: 
   - Implement remaining methods
   - Find solution to abstract SQL
*/
@Injectable()
export class TicketAssignService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  async create(createTicketAssignDto: CreateTicketAssignDto) {
    const {
      assignedby,
      assignedto,
      comment,
      assigndate,
    } = createTicketAssignDto;

    /* Insert new user into db 
         TODO: implement error handling for pg request
      */
    const text =
      'INSERT INTO ticketwork(assignedby, assignedto, comment, assigndate) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [assignedby, assignedto, comment, assigndate];
    const res = (await this.connection.query<TicketAssign>(text, values))
      .rows[0];

    /* Return user object without password */
    const ticketassign = new TicketAssign();
    ticketassign.assignedby = res.assignedby;
    ticketassign.assignedto = res.assignedto;
    ticketassign.comment = res.comment;
    ticketassign.assigndate = res.assigndate;
    return ticketassign;
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
  update(id: number, updateTicketAssignDto: UpdateTicketAssignDto) {
    return `This action updates a #${id} user`;
  }
  /* TODO */
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
