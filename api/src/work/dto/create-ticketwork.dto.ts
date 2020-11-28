import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketWorkDto {
  @ApiProperty({ minLength: 3 })
  issue: string;

  @ApiProperty({ minLength: 3 })
  component: string;

  @ApiProperty({})
  description: number;

  @ApiProperty({})
  starttime: Date;

  @ApiProperty({})
  endtime: Date;
}
