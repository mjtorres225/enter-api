import { Body, Controller, Get, Post } from '@nestjs/common';
import { provinciasService } from './provincias.service';
import { Provincia } from '@prisma/client';
@Controller('provincias')
export class provinciasController {
  constructor(private provinciasService: provinciasService) {}

  @Get('get')
  getall(){
    return this.provinciasService.getall();
  }
  @Get('provinceInfo')
  getProyects() {
    return this.provinciasService.provinceInfo();
  }
  @Post('updateProvince')
  updateProvince(@Body() dto: Provincia){
    return this.provinciasService.editProvince(dto);
  }
  @Post('getAllFiltered')
  getallFiltered(@Body() dto: any){
    return this.provinciasService.getallFiltered(dto);
  }
  
}
