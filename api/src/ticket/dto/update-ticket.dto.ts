import { PartialType } from '@nestjs/swagger';
import { TicketDto } from './ticket.dto';

export class UpdateTicketDto extends PartialType(TicketDto) {}
