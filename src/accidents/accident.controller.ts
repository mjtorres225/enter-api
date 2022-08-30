import {
  Body,
  Controller,
  // Get,
  Inject,
  Post,
  UseInterceptors,
  UploadedFile,
  // Response,
  // Res,
  // // StreamableFile,
  // UploadedFile,
  // UseInterceptors,
} from '@nestjs/common';
import { IEmployeeAccident } from './i-accidents.service';
import { EmployeeAccident } from '@prisma/client';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import * as path from 'path';
// import fs from 'fs'
// import { createReadStream } from 'fs';
// import { join } from 'path';
@Controller('accident')
export class AccidentsController {
  constructor(
    @Inject('IEmployeeAccident')
    private readonly _accidentsService: IEmployeeAccident,
  ) {}

  @Post('add')
  addAccident(@Body() dto: EmployeeAccident) {
    return this._accidentsService.addAccident(dto);
  }
  @Post('edit')
  editAccident(@Body() dto: EmployeeAccident) {
    return this._accidentsService.editAccident(dto);
  }
  @Post('disable')
  disableAccident(@Body() dto: any) {
    return this._accidentsService.disableAccident(dto);
  }
  @Post('allAccidents')
  accidentList(@Body() dto: any) {
    return this._accidentsService.accidentList(dto);
  }
  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './upload/accidents',
        filename(req, file, callback) {
          const newName = req.params.id;
          const mimeType = file.mimetype;

          const extension = mimeType.slice(mimeType.indexOf('/') + 1).trim();

          const extensionName =
            !extension.includes('png') ||
            !extension.includes('jpeg') ||
            !extension.includes('jpg')
              ? 'png'
              : extension;

          callback(null, `${newName}.${extensionName}`);
        },
      }),
    }),
  )
  uploadSingle(@UploadedFile() file: any) {
    const response = {
      message: 'File uploaded successfully!',
      data: {
        originalname: file.originalname,
        filename: file.filename,
      },
      image: file,
    };
    return response;
  }
  // @Post('files')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './upload',
  //       filename: (req, file, callBack) => {
  //         const fileName =
  //           path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
  //         const extension = path.parse(file.originalname).ext;
  //         callBack(null, `${fileName}${extension}`);
  //       },
  //     }),
  //   }),
  // )
  // uploadFile(@UploadedFile() file: any, @Res() res: any) {
  //   console.log(file);
  // }

  // @Get('download')
  // getFile(@Response() res: any) {
  //   const filePath = 'C:/Users/Sebastian Santos/OneDrive/Escritorio/Trabajo/enter-server/upload/paisaje-800x4091653272814164.jpg';
  //   res.sendFile(filePath)
  // }
  // @Post('xd')
  // getfile(@Body() dto: any) {
  //   return this._accidentsService.getfile(dto);
  // }
}
