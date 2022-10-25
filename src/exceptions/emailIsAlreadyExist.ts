import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailIsAlreadyExist extends HttpException {
  constructor() {
    super('User with this email is already exists', HttpStatus.FORBIDDEN);
  }
}
