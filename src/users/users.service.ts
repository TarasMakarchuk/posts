import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailIsAlreadyExist } from 'src/exceptions/emailIsAlreadyExist';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User)
              private userRepository: typeof User,
              private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const duplicateEmail = await this.userRepository.findOne({ where: { email: dto.email } });
    if (duplicateEmail) {
      throw new EmailIsAlreadyExist();
    }
    const role = await this.roleService.getRoleByValue('USER');
    const user = await this.userRepository.create(dto);
    await user.$set('roles', [role.id]);

    return user;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }
}
