import { Controller, Post, Body } from '@nestjs/common';
import { permitsService } from './permits.service';
@Controller('permits')
export class permitsController {
  constructor(private permitsService: permitsService) {}

  @Post('get') 
  getall(@Body() dto: any) {
    return this.permitsService.getall(dto); 
  }
  @Post('add')
  getUser(@Body() dto: any) {
    return this.permitsService.addPermit(dto);
  }
  
}