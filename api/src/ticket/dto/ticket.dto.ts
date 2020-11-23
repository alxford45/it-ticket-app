import { ApiProperty } from '@nestjs/swagger';

enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
export class TicketDto {
  @ApiProperty({ readOnly: true })
  ticket_id: number;

  @ApiProperty({
    minLength: 3,
    maxLength: 5,
    enum: Priority,
    description: 'low, medium, high',
    example: Priority.low,
  })
  priority: string;

  @ApiProperty({ description: 'opened or closed', example: 'opened' })
  status: string;

  @ApiProperty({ description: 'category of issue', example: 'General Help' })
  category: string;

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
  problem: string;

  @ApiProperty({ description: 'manufacturer of device', example: 'dell' })
  manufacturer: string;

  @ApiProperty({
    minLength: 1,
    description: 'model of device',
    example: '15',
  })
  model: number;

  @ApiProperty({
    minLength: 1,
    description: 'operating system',
    example: 'windows',
  })
  os: string;

  // Not sure of example data for os version
  @ApiProperty({ description: 'operating system version', example: 'version1' })
  version: string;
}
