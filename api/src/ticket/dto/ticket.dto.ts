import { ApiProperty } from '@nestjs/swagger';

export enum TicketType {
  'OPENED',
  'CLOSED',
  'ANY',
}

export class Ticket {
  @ApiProperty({ readOnly: true })
  ticket_id: number;

  @ApiProperty({
    minLength: 9,
    maxLength: 9,
    description: '9-digit number starting with 89',
    example: 897584512,
  })
  lsu_id: number;

  @ApiProperty({
    minimum: 1,
    maximum: 3,
    description: 'low=1, medium=2, high=3',
    example: 1,
  })
  priority: number;

  @ApiProperty({ description: 'opened or closed', example: 'opened' })
  status: string;

  @ApiProperty({ description: 'category of issue', example: 'General Help' })
  problem_category: string;

  @ApiProperty({
    description: 'description of issue',
    example: 'Windows stuck in update',
  })
  description: string;

  // Not sure of difference between description and problem
  @ApiProperty({
    description: 'label of problem student is facing',
    example: 'computer slowdown',
  })
  core_issue: string;

  @ApiProperty({
    description: 'YYYY-MM-DD HH:MM:SS',
  })
  submission_date: string;
}
