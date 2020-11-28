import { Ticket } from './ticket.dto';
import { OmitType as Omit } from '@nestjs/swagger';

export class CreateTicket extends Omit(Ticket, [
  'ticket_id',
  'priority',
  'status',
]) {}
