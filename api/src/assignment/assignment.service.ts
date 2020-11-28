import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateAssignmentDTO } from './dto/create-assignment.dto';
import { UpdateAssignmentDTO } from './dto/update-assignment.dto';
import { AssignmentDTO } from './dto/assignment.dto';

/* TODO: 
   - Implement remaining methods
   - Find solution to abstract SQL
*/
@Injectable()
export class AssignmentService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  async create(createAssignmentDTO: CreateAssignmentDTO) {
    const { assignedby, assignedto, comment, assigndate } = createAssignmentDTO;

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
  update(id: number, updateAssignmentDTO: UpdateAssignmentDTO) {
    return `This action updates a #${id} user`;
  }
  /* TODO */
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
