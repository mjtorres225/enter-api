import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
// import { Maestro } from '@prisma/client';
import { IMaestroService } from './i-maestros.service';
@Controller('maestros')
export class MaestrosController {
  constructor(
    @Inject('IMaestroService')
    private readonly _maestroService: IMaestroService,
  ) {}

  @Get('getmaestros')
  getMaestros() {
    return this._maestroService.getMaestros();
  }
  @Post('add')
  addMaestro(@Body() dto: any) {
    return this._maestroService.addMaestro(dto);
  }
  @Post('filterMaestros')
  filterMaestro(@Body() dto: any) {
    return this._maestroService.filterMaestro(dto);
  }

  @Post('getByProject')
  getByProject(@Body() dto: any) {
    return this._maestroService.getByProject(dto);
  }

  @Post('editmaestro')
  editMaestro(@Body() dto: any) {
    return this._maestroService.editMaestro(dto);
  }
  @Post('disablemaestro')
  disableMaestro(@Body() dto: any) {
    return this._maestroService.disableMaestro(dto);
  }
  @Post('byProjectPrivince')
  getByProvinceProject(@Body() dto: any) {
    return this._maestroService.getByProvinceProject(dto);
  }
  // @Post('deleteAll')
  // deleteAll(@Body() dto: any) {
  //   return this._maestroService.deleteAll();
  // }
}
