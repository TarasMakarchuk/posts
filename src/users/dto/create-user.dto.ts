import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'Email, unique identifier'})
  readonly email: string;

  @ApiProperty({ example: '123456789', description: 'Password'})
  readonly password: string;
}
