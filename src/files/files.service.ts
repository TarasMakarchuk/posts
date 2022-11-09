import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    const fileExtension = file.originalname.split('.')[1];
    try {
      const fileName = uuid.v4() + `.${fileExtension}`;
      const filePath = path.resolve(__dirname, "..", "static");
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (e) {
      throw new HttpException("an error occurred while writing the file", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}
