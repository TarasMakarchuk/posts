import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'First name'})
  @IsString({ message: 'First name should be string'})
  @Length(2, 25, { message: 'First name\'s length should be more than 2 and less than 25' })
  readonly firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name'})
  @IsString({ message: 'Last name should be string'})
  @Length(2, 35, { message: 'Last name\'s length should be more than 2 and less than 35' })
  readonly lastName: string;

  @ApiProperty({ example: 'user@email.com', description: 'Email, unique identifier'})
  @IsString({ message: 'Email should be string'})
  @IsEmail({}, { message: 'Email is incorrect' })
  readonly email: string;

  @ApiProperty({ example: '123Abc', description: 'Password'})
  @IsString({ message: 'It should be string'})
  @Length(3, 16, { message: 'Password\'s length should be more than 3 and less than 16' })
  readonly password: string;
}
