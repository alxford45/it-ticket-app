import { PartialType } from '@nestjs/swagger';
import { Ticket } from './ticket.dto';

export class UpdateTicketDto extends PartialType(Ticket) {}
