import { ApiProperty, OmitType as Omit } from '@nestjs/swagger';
import { AssignmentDTO } from './assignment.dto';

export class CreateAssignmentDTO extends Omit(AssignmentDTO, [
  'assignment_id',
  'assigned_date',
]) {}
