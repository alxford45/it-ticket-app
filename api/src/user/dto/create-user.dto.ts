import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({minLength:1, description: "username must be at least one character", example: "user1"})
    username: string;

    @ApiProperty({minLength:3, description: "email must be at least 3 characters in format: address@domain",example: "user1@email.com"})
    email: string;

    @ApiProperty({minLength:7, example: "password"})
    password: string;
}
