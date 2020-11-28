import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketAssignDto {
  @ApiProperty({ minLength: 3 })
  assignedby: string;

  @ApiProperty({ minLength: 3 })
  assignedto: string;

  @ApiProperty({})
  comment: number;

  @ApiProperty({})
  assigndate: Date;
}
