import { join, extname } from 'path';
import fs from 'fs';

export const getPath = (fileName: string): string => {
  const filePath = join(__dirname, 'upload', fileName);
  const extension = extname(filePath);
  console.log(extension);
  return `${filePath}${'.png'}`;
};

export const getImgFile = (fileName: string) => {
  const path = getPath(fileName);
  const img = fs.readFileSync(path);

  return img;
};
