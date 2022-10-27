import { IsNumber, IsString } from "class-validator";

export class BanUserDto {
  @IsNumber({}, { message: 'It should be a number' })
  readonly userId: number;

  @IsString({ message: 'It should be a string' })
  readonly banReason: string;
}