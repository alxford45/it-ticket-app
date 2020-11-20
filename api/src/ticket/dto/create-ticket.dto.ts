import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({
    minLength: 3,
    example: 'High',
  })
  priority: string;

  @ApiProperty({
    minLength: 3,
    example: 'Dell',
  })
  manufacturer: string;

  @ApiProperty({ minLength: 1 })
  model: number;

  @ApiProperty({ minLength: 1 })
  os: string;

  @ApiProperty({})
  version: string;

  @ApiProperty({})
  problem: string;

  @ApiProperty({})
  description: string;
}
