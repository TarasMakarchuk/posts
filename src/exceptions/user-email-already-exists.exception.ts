import { HttpException, HttpStatus } from '@nestjs/common';

export class UserEmailAlreadyExistsException extends HttpException {
  constructor() {
    super('User with this email is already exists', HttpStatus.FORBIDDEN);
  }
}
