import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: 'User', description: 'Should be uppercase'})
  readonly value: string;

  @ApiProperty({ example: 31, description: 'Should be number'})
  readonly userId: number;
}