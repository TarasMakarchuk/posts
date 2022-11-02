import { BadRequestException } from '@nestjs/common';
import * as path from 'path';

const allowedFileExtensions = ['.jpg', '.png', '.jpeg', 'gif', '.svg'];

export const fileExtensionFilter = (
  req: any,
  file: { mimetype: string, originalname: string },
  callback: (error: Error | null,
       acceptFile: boolean) => void) => {
  const extension = path.extname(file.originalname);
  if (allowedFileExtensions.includes(extension.toLowerCase())) {
    callback(null, true);
  } else {
    callback(
      new BadRequestException('Only images are allowed', `Bad request. Accepted file extensions are: ${allowedFileExtensions.toString()}`),
      false
    );
  }
};

export const FILE_SIZE = 10 * 1024 *1024;
