import { OmitType as Omit } from '@nestjs/swagger';
import { WorkDTO } from './work.dto';

export class CreateWorkDTO extends Omit(WorkDTO, ['work_id']) {}
