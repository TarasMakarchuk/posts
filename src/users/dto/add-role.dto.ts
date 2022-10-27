import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'It should be a string' })
  readonly value: string;

  @IsNumber({}, { message: 'It should be a number' })
  readonly userId: number;
}
