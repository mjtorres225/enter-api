import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Delete,
  Param,
  Post,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { employeesService } from './employees.service';

@Controller('employees')
export class employeesController {
  constructor(private employeesService: employeesService) {}

  @Get('get')
  getall() {
    return this.employeesService.getall();
  }
  @Get('getById')
  getById(@Query() dto: any) {
    return this.employeesService.getById(dto);
  }
  @Post('getEntryInfo')
  getEntryInfo(@Body() dto: any) {
    return this.employeesService.getEmployeeEntryInfo(dto);
  }
  @Get('getEntries')
  getgetEntriesById() {
    return this.employeesService.getEntries();
  }
  @Get('getCountEntries')
  getCountEntries() {
    return this.employeesService.getCountEntries();
  }
  @Get('getTemporalEntries')
  getTemporalEntries() {
    return this.employeesService.getTemporalEntries();
  }
  @Get('getPhotoFile/:_id')
  getFile(@Param() _id: any): any {
    console.log('Inside the photo File', _id);
    try {
      const file = createReadStream(
        join(process.cwd(), `./upload/${_id._id}.png`),
      );
      return new StreamableFile(file);
    } catch (error) {
      return new ForbiddenException('No hay Files');
    }
  }
  @Post('filterEntries')
  filterEntries(@Body() dto: any) {
    return this.employeesService.filterEntries(dto);
  }
  @Post('filterExits')
  filterExits(@Body() dto: any) {
    return this.employeesService.filterExits(dto);
  }
  @Post('getEntriesByProvince')
  getEntriesByProvince(@Body() dto: any) {
    return this.employeesService.getEntriesbyProvince(dto);
  }
  @Post('add')
  addEmployee(@Body() dto: any) {
    return this.employeesService.addEmployer(dto);
  }
  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './upload',
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
  @Post('employeeEntry')
  employeEntry(@Body() dto: any) {
    return this.employeesService.employeEntry(dto);
  }
  @Post('employeeExit')
  employeeExit(@Body() dto: any) {
    return this.employeesService.employeeExit(dto);
  }
  @Post('filterEmployees')
  filterEmployees(@Body() dto: any) {
    return this.employeesService.filterEmployees(dto);
  }
  @Post('getEntriesByMaestro')
  getEntriesByMaestro(@Body() dto: any) {
    return this.employeesService.getEntriesByMaestro(dto);
  }

  @Post('deleteemployee')
  deleteEmployee(@Body() dto: any) {
    return this.employeesService.deleteEmployee(dto);
  }
  @Post('editemployee')
  editEmployee(@Body() dto: any) {
    return this.employeesService.editEmployee(dto);
  }

  // @Post('deleteAll')
  // deleteAll(@Body() dto: any) {
  //   return this.employeesService.deleteAll();
  // }

  // @Post('deleteAllEntries')
  // deleteAllEntries(@Body() dto: any) {
  //   return this.employeesService.deleteAllEntries();
  // }

  @Post('EntriesByProject')
  getEntriesByProject(@Body() dto: any) {
    return this.employeesService.getEntriesByProject(dto);
  }

  @Post('getAbsenceEmployees')
  getAbsenceEmployees(@Body() dto: any) {
    return this.employeesService.getAbsentEmployee(dto);
  }
  @Post('EntriesByLabor')
  getEntriesByLabor(@Body() dto: any) {
    return this.employeesService.getEntriesByLabor(dto);
  }
  @Post('changeRating')
  changeRating(@Body() dto: any) {
    return this.employeesService.changeRating(dto);
  }
  @Get('hola')
  change() {
    return this.employeesService.changeLabor();
  }
  @Post('updateStatus')
  updateStatus() {
    return this.employeesService.updateUser();
  }
  @Delete()
  deleteTemporalEntries(){
    return this.employeesService.deleteAllTemporalEntries();
  }
  // @Delete('employeesList')
  // deleteEmployeesList() {
  //   return this.employeesService.deleteAll();
  // }
}
