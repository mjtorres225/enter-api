import { Module } from '@nestjs/common';
import { provinciasController } from './pronvincias.controller';
import { provinciasService } from './provincias.service';

@Module({
  controllers: [provinciasController],
  providers: [provinciasService],
})
export class provinciasModule {}
