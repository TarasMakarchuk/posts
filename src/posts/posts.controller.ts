import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as PostModel } from '../posts/post.model';
import { FILE_SIZE, fileExtensionFilter } from '../helpers/image-upload-filter';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Post creating' })
  @ApiResponse({ status: 200, type: PostModel })
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    limits: {
      fileSize: FILE_SIZE,
    },
    fileFilter: fileExtensionFilter,
  }))
  createPosts(@Body() dto: CreatePostDto,
              @UploadedFile() image: any,
              @Req() req: any) {
    return this.postsService.create(dto, image);
  };
}
