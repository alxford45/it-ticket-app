import { IntersectionType } from '@nestjs/swagger';
import { TicketDTO } from './ticket.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { DeviceDTO } from './device.dto';

class TicketAndDeviceDTO extends IntersectionType(TicketDTO, DeviceDTO) {}

export class CombinedDTO extends IntersectionType(
  TicketAndDeviceDTO,
  UserDTO,
) {}
