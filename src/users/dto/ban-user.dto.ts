import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class BanUserDto {
  @ApiProperty({ example: 31, description: 'Should be number'})
  @IsNumber({}, { message: 'It should be a number' })
  readonly userId: number;

  @ApiProperty({ example: 'For bad behavior', description: 'Ban reason'})
  @IsString({ message: 'It should be a string' })
  readonly banReason: string;
}