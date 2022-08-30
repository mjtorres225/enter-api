import { Body, Controller, Get, Post } from '@nestjs/common';
import { LaborService } from './labor.service';

@Controller('labor')
export class LaborController {
  constructor(private laborService: LaborService) {}
  @Post('addlabor')
  addLabor(@Body() dto: any) {
    return this.laborService.addLabor(dto);
  }
  @Get('getlabores')
  getLabores(){
    return this.laborService.getLabores();
  }
  @Post('editlabor')
  editLabor(@Body() dto: any) {
    return this.laborService.editLabor(dto);
  }
  @Post('deletelabor')
  disableLabor(@Body() dto: any) {
    return this.laborService.disableLabor(dto);
  }

  @Post('getById')
  getById(@Body()  dto: any){
    return this.laborService.getById(dto.id)
  }
  @Post('getAllLabors')
  getAllLabors(@Body()  dto: any){
    return this.laborService.getAllLabors(dto.idArray)
  }
}