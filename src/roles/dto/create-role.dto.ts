import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Administrator, unique identifier'})
  @IsString({ message: 'It should be a string' })
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'Access level'})
  @IsString({ message: 'It should be a string' })
  readonly description: string;
}