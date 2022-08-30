import { Module } from '@nestjs/common';
import { employeesController } from './employees.controller';
import { employeesService } from './employees.service';

@Module({
  controllers: [employeesController],
  providers: [employeesService],
})
export class employeesModule {}
