import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 1, description: 'User identifier'})
  @IsNumber({}, { message: 'Should be a number'})
  readonly userId: number;

  @ApiProperty({ example: 'John', description: 'First name'})
  @IsString({ message: 'First name should be a string'})
  readonly firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name'})
  @IsString({ message: 'Last name should be a string'})
  readonly lastName: string;

  @ApiProperty({ example: 'user@email.com', description: 'Email, unique identifier'})
  @IsString({ message: 'Email should be string'})
  readonly email: string;

  @ApiProperty({ example: '123Abc', description: 'Password'})
  @IsString({ message: 'It should be a string'})
  readonly password: string;
}
