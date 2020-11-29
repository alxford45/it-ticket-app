import { ApiProperty } from '@nestjs/swagger';
export enum AssignmentType {
  'LSU_ID',
  'TICKET_ID',
}
export class AssignmentDTO {
  @ApiProperty({
    description: 'serial generated assignment id',
    example: 1,
  })
  assignment_id: number;

  @ApiProperty({
    minLength: 9,
    maxLength: 9,
    description: '9-digit number starting with 89',
    example: 897584512,
  })
  lsu_id: number;

  @ApiProperty({
    description: 'serial generated ticket id',
    example: 1,
  })
  ticket_id: number;

  @ApiProperty({
    description: 'YYYY-MM-DD HH:MM:SS',
    example: '2020-07-21 12:44:22',
  })
  assigned_date: string;
}
