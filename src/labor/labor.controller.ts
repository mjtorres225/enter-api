import { Body, Controller, Get, Post} from '@nestjs/common';
import { laborService } from './labor.service';

@Controller('labor')
export class laborController{
    constructor(private laborService : laborService){}
    
    @Post('add')
    addEmployee(@Body() dto: any) {
      return this.laborService.addLabor(dto);
    }

    @Get('get')
    getall() {
        return this.laborService.getall();
    }

 

}
