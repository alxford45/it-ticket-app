import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty({
    minLength: 11,
    description:
      'email must be at least 3 characters in format: {first initial}{lastname}{1-99}@lsu.edu',
    example: 'jsmith1@lsu.edu',
  })
  email: string;

  @ApiProperty({
    minLength: 9,
    maxLength: 9,
    description: '9-digit number starting with 89',
    example: 897584512,
  })
  lsuid: number;

  @ApiProperty({
    description: 'first name',
    example: 'john',
  })
  firstname: string;

  @ApiProperty({
    description: 'last name',
    example: 'smith',
  })
  lastname: string;

  @ApiProperty({
    minLength: 10,
    maxLength: 10,
    description: '10 digit number encoded as a string',
    example: '2254784145',
  })
  phone: string;

  @ApiProperty({
    description: '10 digit number encoded as a string',
    example: 'Computer Science',
  })
  department: string;
}
