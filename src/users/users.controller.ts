import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Users } from '@prisma/client';
import { IUsersService } from './i-user.service';
@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUsersService') private readonly _usersService: IUsersService,
  ) {}

  @Get('getAll')
  async getAll() {
    return await this._usersService.getAll();
  }
  @Post('filterUsers')
  filterUsers(@Body() dto: Users) {
    return this._usersService.filterUsers(dto);
  }
  @Post('editUser')
  editUser(@Body() dto: Users) {
    return this._usersService.editUser(dto);
  }
  @Post('disableUser')
  disableUser(@Body() dto: any) {
    return this._usersService.disableUser(dto);
  }
}
