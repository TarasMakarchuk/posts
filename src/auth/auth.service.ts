import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists.exception';
import { User } from '../users/user.model';
import { IncorrectUserCredentialsException } from '../exceptions/incorrect-user-credentials.exception';
import { comparePasswords } from '../helpers/bcryptjs.helper';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  };

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new UserEmailAlreadyExistsException();
    }

    const user = await this.usersService.createUser(dto);

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

  public async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    const isPasswordsEqual = await comparePasswords(dto.password, user.password);
    if (user && isPasswordsEqual) {
      return user;
    }

    throw new IncorrectUserCredentialsException();
  };
}
