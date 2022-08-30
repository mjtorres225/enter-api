import { Module } from '@nestjs/common';
import { permitsController } from './permits.controller';
import { permitsService } from './permits.service';

@Module({
  controllers: [permitsController],
  providers: [permitsService],
})
export class permitssModule {}