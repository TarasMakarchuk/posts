import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
  @ApiProperty({ example: 31, description: 'Should be number'})
  readonly userId: number;

  @ApiProperty({ example: 'For bad behavior', description: 'Ban reason'})
  readonly banReason: string;
}