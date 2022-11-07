import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';
import { FilesService } from '../files/files.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postsRepository: typeof Post,
              private filesService: FilesService,
              private usersService: UsersService) {}

  async create(dto: CreatePostDto, image: any): Promise<CreatePostDto> {
    const fileName = image ? await this.filesService.createFile(image) : null;
    return await this.postsRepository.create({ ...dto, image: fileName });
  }

  async updatePost(dto: UpdatePostDto, image: any): Promise<Post> {
    const user = await this.usersService.getUserById(dto.userId);
    let post = await this.getPostById(+dto.postId);
    const fileName = image ? await this.filesService.createFile(image) : null;
    if (user && post) {
      await post.set({
        title: dto.title === ''  ? post.title : dto.title,
        content: dto.content === '' ? post.content : dto.content,
        image: (dto.image === '') ? post.image : fileName,
      });
      post = await post.save();

      return post;
    }

    throw new HttpException('Post or user not found', HttpStatus.NOT_FOUND);
  };

  async getAllPosts() {
    return await this.postsRepository.findAll({ include: { all: true } });
  };

  async getPostById(id: number) {
    return await this.postsRepository.findOne({ where: { id }, include: { all: true } });
  };

  async remove(id: number) {
    const post = await this.getPostById(id);
    if (!post) {
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
    }
    await this.postsRepository.destroy( { where: { id } } );

    return `Success, user with id ${id} was deleted`;
  }
}
