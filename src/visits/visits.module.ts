import { Module } from '@nestjs/common';
import { VisitsController } from './visits.controller';
import { VisitService } from './visits.service';

@Module({
  controllers: [VisitsController],
  providers: [VisitService],
})
export class VisitModule {}
