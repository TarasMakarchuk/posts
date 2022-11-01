import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as PostModel } from '../posts/post.model';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Post creating' })
  @ApiResponse({ status: 200, type: PostModel })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPosts(@Body() dto: CreatePostDto,
              @UploadedFile() image) {
    return this.postsService.create(dto, image);
  };
}
