import {
  Body,
  Controller,
  Delete, Get,
  Param,
  Post, Put,
  UploadedFile,
  UseInterceptors, UsePipes
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as PostModel } from '../posts/post.model';
import { FILE_SIZE, fileExtensionFilter } from '../helpers/image-upload-filter';
import { Roles } from '../auth/role-auth.decorator';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/user.model';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Post creating' })
  @ApiResponse({ status: 200, type: PostModel })
  @Roles('ADMIN', 'USER')
  @UsePipes(ValidationPipe)
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

  @ApiOperation({ summary: 'Post updating' })
  @ApiResponse({ status: 200, type: Post })
  @Roles('ADMIN', 'USER')
  @UseInterceptors(FileInterceptor('image', {
    limits: {
      fileSize: FILE_SIZE,
    },
    fileFilter: fileExtensionFilter,
  }))
  @Put()
  update(@Body() dto: UpdatePostDto, @UploadedFile() image) {
    return this.postsService.updatePost(dto, image);
  };

  @ApiOperation({ summary: 'Get all posts list' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN', 'USER')
  @Get()
  getAll() {
    return this.postsService.getAllPosts();
  };

  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 200 })
  @Roles( 'ADMIN', 'USER')
  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.postsService.remove(id);
  };
}
