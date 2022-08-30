import { Module, Provider } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const UsersServiceProvider: Provider = {
  provide: 'IUsersService',
  useClass: UsersService,
};

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersServiceProvider],
  exports: [UsersService, UsersServiceProvider],
})
export class UsersModule {}
