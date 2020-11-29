import { CreateDeviceDTO } from './create-device.dto';
import { OmitType as Omit } from '@nestjs/swagger';

export class UpdateDeviceDTO extends Omit(CreateDeviceDTO, ['ticket_id']) {}
