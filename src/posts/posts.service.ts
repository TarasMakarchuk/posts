import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postsRepository: typeof Post,
              private filesService: FilesService) {}

  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.filesService.createFile(image);
    return await this.postsRepository.create({ ...dto, image: fileName });
  }
}
