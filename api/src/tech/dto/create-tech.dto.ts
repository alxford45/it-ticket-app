import { ApiProperty } from '@nestjs/swagger';

export class CreateTechDto {
  @ApiProperty({
    minLength: 1,
    description: 'Name must be at least 1 character',
    example: 'John',
  })
  firstname: string;

  @ApiProperty({
    minLength: 1,
    description: 'Name must be at least 1 character',
    example: 'Doe',
  })
  lastname: string;

  @ApiProperty({
    minLength: 3,
    description:
      'email must be at least 3 characters in format: address@domain',
    example: 'user1@email.com',
  })
  email: string;

  @ApiProperty({ minLength: 9, maxLength: 9, example: '8911111111' })
  lsuid: number;

  @ApiProperty({ minLength: 10, maxLength: 10, example: '800111111' })
  phone: number;
}
