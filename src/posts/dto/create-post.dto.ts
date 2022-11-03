import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'New post', description: 'Title, length should be more than 5 and less than 200' })
  @Length(5, 200, { message: 'Title\'s length should be more than 5 and less than 200' })
  readonly title: string;

  @ApiProperty({ example: 'Content', description: 'Content, length should be more than 30 and less than 100 000' })
  @Length(30, 100000, { message: 'Content\'s length should be more than 30 and less than 100 000' })
  readonly content: string;

  @ApiProperty({ example: 5, description: 'UserId should be number type' })
  readonly userId: number;

  @ApiProperty({
    example: 'Image file',
    description: 'Optional parameter, image should be jpeg/jpg/gif/png/svg format',
  })
  readonly image: string;
}