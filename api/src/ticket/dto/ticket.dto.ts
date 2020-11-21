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

  @ApiProperty({ description: 'manufacturer of device', example: 'dell' })
  manufacturer: string;

  @ApiProperty({
    description: 'model of device',
    example: 'inspiron 15',
  })
  model: string;

  @ApiProperty({ description: 'operating system', example: 'windows' })
  os: string;

  // number or string?
  @ApiProperty({ description: 'operating system version', example: '10' })
  os_version: string;
}
