import { OmitType as Omit } from '@nestjs/swagger';
import { Device } from './device.dto';

export class CreateDevice extends Omit(Device, ['device_id']) {}
