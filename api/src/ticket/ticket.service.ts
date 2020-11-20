import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

/* TODO: 
   - Implement remaining methods
   - Find solution to abstract SQL
*/
@Injectable()
export class TicketService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  async create(createTicketDto: CreateTicketDto) {
    const {
      priority,
      manufacturer,
      model,
      os,
      problem,
      description,
    } = createTicketDto;

    /* Insert new user into db 
         TODO: implement error handling for pg request
      */
    const text =
      'INSERT INTO ticket(priority, manufacturer, model, os, problem, description) VALUES ($1, $2, $3, $4, $5, %6) RETURNING *';
    const values = [priority, manufacturer, model, os, problem, description];
    const res = (await this.connection.query<Ticket>(text, values)).rows[0];

    /* Return user object without password */
    const ticket = new Ticket();
    ticket.priority = res.priority;
    ticket.manufacturer = res.manufacturer;
    ticket.model = res.model;
    ticket.os = res.os;
    ticket.problem = res.problem;
    ticket.description = res.description;
    return ticket;
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
  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} user`;
  }
  /* TODO */
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
