import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ minLength: 1, example: 'John' })
  firstname: string;

  @ApiProperty({ minLength: 1, example: 'Doe' })
  lastname: string;

  @ApiProperty({ minLength: 9, maxLength: 9, example: '891111111' })
  lsuid: number;

  @ApiProperty({ minLength: 7, example: 'password' })
  department: string;

  @ApiProperty({
    minLength: 3,
    description:
      'email must be at least 3 characters in format: address@domain',
    example: 'user1@email.com',
  })
  email: string;

  @ApiProperty({ minLength: 10, maxLength: 10, example: '8001111111' })
  phone: string;
}
