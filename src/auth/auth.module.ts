import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const AuthServiceProvider : Provider = {
  provide: 'IAuthService',
  useClass: AuthService
}

@Module({
    imports: [UsersModule,JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService : ConfigService) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: {expiresIn : '30s'}
        })  
    })],
  controllers: [AuthController],
  providers: [AuthService,AuthServiceProvider],
})
export class AuthModule {}