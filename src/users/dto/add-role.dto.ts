import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'User', description: 'Should be uppercase'})
  @IsString({ message: 'It should be a string' })
  readonly value: string;

  @ApiProperty({ example: 31, description: 'Should be number'})
  @IsNumber({}, { message: 'It should be a number' })
  readonly userId: number;
}
