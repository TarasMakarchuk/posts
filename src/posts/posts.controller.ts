import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as PostModel } from '../posts/post.model';
import { FILE_SIZE, fileExtensionFilter } from '../helpers/image-upload-filter';
import { Roles } from '../auth/role-auth.decorator';

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
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image){
    return this.postsService.create(dto, image);
  };

  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 200 })
  @Roles( 'ADMIN', 'USER')
  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.postsService.remove(id);
  };
}
