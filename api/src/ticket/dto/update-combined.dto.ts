import { IntersectionType } from '@nestjs/swagger';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';
import { UpdateDeviceDTO } from './update-device.dto';
import { UpdateTicketDto } from './update-ticket.dto';

class UpdateTicketandDevice extends IntersectionType(
  UpdateTicketDto,
  UpdateDeviceDTO,
) {}

export class UpdateCombinedDTO extends IntersectionType(
  UpdateTicketandDevice,
  UpdateUserDTO,
) {}
