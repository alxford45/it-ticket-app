import { TicketDTO } from './ticket.dto';
import { OmitType as Omit } from '@nestjs/swagger';

export class CreateTicketDTO extends Omit(TicketDTO, [
  'ticket_id',
  'status',
  'submission_date',
]) {}
