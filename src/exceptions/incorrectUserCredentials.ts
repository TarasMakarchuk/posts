import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectUserCredentials extends HttpException {
  constructor() {
    super('Incorrect email or password', HttpStatus.BAD_REQUEST);
  }
}
