import { PartialType } from '@nestjs/swagger';
import { CreateTicket } from './create-ticket.dto';
import { Ticket } from './ticket.dto';
import { OmitType as Omit } from '@nestjs/swagger';

export class UpdateTicketDto extends Omit(Ticket, [
  'ticket_id',
  'submission_date',
  'lsu_id',
]) {}
