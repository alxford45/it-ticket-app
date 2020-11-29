import { IntersectionType, OmitType as Omit } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { CreateTicketDTO } from './create-ticket.dto';
import { CreateDeviceDTO } from './create-device.dto';

class createTicketAndDeviceDTO extends IntersectionType(
  CreateTicketDTO,
  Omit(CreateDeviceDTO, ['ticket_id']),
) {}

export class CreateCombinedDTO extends IntersectionType(
  createTicketAndDeviceDTO,
  Omit(CreateUserDTO, ['admin']),
) {}
