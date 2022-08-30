import { Module } from '@nestjs/common';
import { provinciasModule } from './provincias/provincias.module';
import { employeesModule } from './employees/employees.module';
import { ScheduleModule } from '@nestjs/schedule';
import { moduleProyecto } from './projects/proyecto.module';
import { UsersModule } from './users/users.module';
import { permitssModule } from './permissions/permits.module';
import { AuthModule } from './auth/auth.module';
import { roleModule } from './roles/role.module';
import { AccidentsModule } from './accidents/accident.module';
import { laborModule } from './labores/labor.module';
import { MaestrosModule } from './maestros/maestros.module';
import { AppService } from './app.service';
import { VisitModule } from './visits/visits.module';

@Module({
  imports: [
    provinciasModule,
    employeesModule,
    moduleProyecto,
    UsersModule,
    permitssModule,
    AuthModule,
    roleModule,
    AccidentsModule,
    laborModule,
    MaestrosModule,
    VisitModule,
    ScheduleModule.forRoot(),
  ],
  providers: [AppService],
})
export class AppModule {}
