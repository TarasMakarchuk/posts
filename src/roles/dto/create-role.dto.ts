import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Administrator, unique identifier'})
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'Access level'})
  readonly description: string;
}