import { ApiProperty } from '@nestjs/swagger';

export enum WorkType {
  'LSU_ID',
  'TICKET_ID',
}

export class WorkDTO {
  @ApiProperty({
    readOnly: true,
    description: 'serially generated id for work',
  })
  work_id: number;

  @ApiProperty({
    description: 'id that references ticket',
    example: 1,
  })
  ticket_id: number;

  @ApiProperty({
    minLength: 9,
    maxLength: 9,
    description: '9-digit number starting with 89',
    example: 897584512,
  })
  lsu_id: number;

  @ApiProperty({
    description: 'YYYY-MM-DD HH:MM:SS',
    example: '2020-07-21 12:44:22',
  })
  start_datetime: string;

  @ApiProperty({
    description: 'YYYY-MM-DD HH:MM:SS',
    example: '2020-07-21 12:44:22',
  })
  end_datetime: string;
}
