import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'Email, unique identifier'})
  @IsString({ message: 'Email should be string'})
  @IsEmail({}, { message: 'Email is incorrect' })
  readonly email: string;

  @ApiProperty({ example: '123456789', description: 'Password'})
  @IsString({ message: 'It should be string'})
  @Length(3, 16, { message: 'Password\'s length should be more than 3 and less than 16' })
  readonly password: string;
}
