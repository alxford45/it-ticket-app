import { OmitType as Omit } from '@nestjs/swagger';
import { DeviceDTO } from './device.dto';

export class CreateDeviceDTO extends Omit(DeviceDTO, ['device_id']) {}
