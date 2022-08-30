import { Module, Provider } from '@nestjs/common';
import { MaestrosController } from './maestros.controller';
import { MaestroService } from './maestros.service';

const MaestrosServiceProvider: Provider = {
  provide: 'IMaestroService',
  useClass: MaestroService,
};

@Module({
  controllers: [MaestrosController],
  providers: [MaestroService, MaestrosServiceProvider],
  exports: [MaestroService, MaestrosServiceProvider],
})
export class MaestrosModule {}

