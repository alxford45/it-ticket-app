import { PartialType } from '@nestjs/swagger';
import { CreateTicketDTO } from './create-ticket.dto';
import { TicketDTO } from './ticket.dto';
import { OmitType as Omit } from '@nestjs/swagger';

export class UpdateTicketDto extends Omit(TicketDTO, [
  'ticket_id',
  'submission_date',
  'lsu_id',
]) {}
