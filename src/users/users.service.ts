import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailIsAlreadyExist } from 'src/exceptions/emailIsAlreadyExist';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const duplicateEmail = await this.userRepository.findOne({ where: {email: dto.email }});
    if (duplicateEmail) {
      throw new EmailIsAlreadyExist();
    }
      return await this.userRepository.create(dto);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}
