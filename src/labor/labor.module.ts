import { Module } from '@nestjs/common';
import { laborController } from './labor.controller';
import { laborService } from './labor.service';

@Module({
  controllers: [laborController],
  providers: [laborService],
})
export class laborModule {}