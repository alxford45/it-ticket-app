import { OmitType as Omit } from '@nestjs/swagger';
import { TicketDTO } from './ticket.dto';

export class UpdateTicketDto extends Omit(TicketDTO, [
  'ticket_id',
  'submission_date',
  'lsu_id',
]) {}
