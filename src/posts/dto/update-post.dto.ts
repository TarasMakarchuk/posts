import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ example: 1, description: 'User identifier'})
  readonly userId: number;

  @ApiProperty({ example: 1, description: 'Post identifier'})
  readonly postId: number;

  @ApiProperty({ example: 'Updating post', description: 'Title, length should be more than 5 and less than 200' })
  @IsString({ message: 'Title should be a string'})
  readonly title: string;

  @ApiProperty({ example: 'Updating content', description: 'Content, length should be more than 30 and less than 100 000' })
  @IsString({ message: 'Content should be a string'})
  readonly content: string;

  @ApiProperty({ example: 'Updating image', description: 'Image format should be .jpg/.png/.jpeg/.gif/.svg' })
  readonly image: string;
}
