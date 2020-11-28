import { IntersectionType, OmitType as Omit } from '@nestjs/swagger';
import { CreateUser } from 'src/user/dto/create-user.dto';
import { CreateTicket } from './create-ticket.dto';
import { CreateDevice } from './create-device.dto';

class createTicketAndDevice extends IntersectionType(
  CreateTicket,
  Omit(CreateDevice, ['ticket_id']),
) {}

export class CreateCombined extends IntersectionType(
  createTicketAndDevice,
  Omit(CreateUser, ['admin']),
) {}
