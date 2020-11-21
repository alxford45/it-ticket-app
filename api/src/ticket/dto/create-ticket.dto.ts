import { ApiProperty, OmitType } from '@nestjs/swagger';
import { TicketDto } from './ticket.dto';
import { OmitType as Omit } from '@nestjs/swagger';

export class CreateTicketDto extends Omit(TicketDto, ['ticket_id']) {}
