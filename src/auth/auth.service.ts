import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserWithThisEmailAlreadyExists } from '../exceptions/userWithThisEmailAlreadyExists';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { IncorrectUserCredentials } from '../exceptions/incorrectUserCredentials';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
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

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };

    return {
      token: this.jwtService.sign(payload)
    };
  };

  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    const passwordEqual = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEqual) {
      return user;
    }

    throw new IncorrectUserCredentials();
  }
}
