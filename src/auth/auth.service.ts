import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserWithThisEmailAlreadyExists } from '../exceptions/userWithThisEmailAlreadyExists';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async login(dto: CreateUserDto) {
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new UserWithThisEmailAlreadyExists();
    }
    const SALT = 5;
    const hashPassword = await bcrypt.hash(dto.password, SALT);
    const user = await this.usersService.createUser({ ...dto, password: hashPassword });

    return this.generateToken(user);
  };

  private generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };

    return {
      token: this.jwtService.sign(payload)
    };
  };
}
