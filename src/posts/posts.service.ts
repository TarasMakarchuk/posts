import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postsRepository: typeof Post) {}

  async create(dto: CreatePostDto) {
    return await this.postsRepository.create(dto);
  }
}
