import { Module, Provider } from '@nestjs/common';
import { AccidentsController } from './accident.controller';
import { accidentsService } from './accident.service';

const AccidentsServiceProvider: Provider = {
  provide: 'IEmployeeAccident',
  useClass: accidentsService,
};

@Module({
  controllers: [AccidentsController],
  providers: [accidentsService, AccidentsServiceProvider],
  exports: [accidentsService, AccidentsServiceProvider],
})
export class AccidentsModule {}
