import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { hashedPassword } from '../helpers/bcryptjs.helper';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User)
              private userRepository: typeof User,
              private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    await this.getUserByEmail(dto.email);
    const role = await this.roleService.getRoleByValue('USER');
    const hashPassword = await hashedPassword(dto.password);
    const user = await this.userRepository.create({ ...dto, password: hashPassword });
    await user.$set('roles', [role.id]);
    user.roles = [role];
    user.password = '';

    return user;
  };

  async updateUser(dto: UpdateUserDto): Promise<User> {
    const hashPassword = await hashedPassword(dto.password);
    let user = await this.getUserById(dto.userId);
    if (user) {
      await user.set({
        firstName: dto.firstName === ''  ? user.firstName : dto.firstName,
        lastName: dto.lastName === '' ? user.lastName : dto.lastName,
        email: dto.email === '' ? user.email : dto.email,
        password: dto.password === '' ? user.password : hashPassword
      });
      user = await user.save();

      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  };

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  };

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, include: { all: true } });
  };

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id }, include: { all: true } });
  };

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  };

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();

    return user;
  };

  async remove(id: number) {
    const user = await this.getUserById(id);
    if (!user) {
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    }
    await this.userRepository.destroy( { where: { id } } );

    return `Success, user with id ${id} was deleted`;
  }
}
