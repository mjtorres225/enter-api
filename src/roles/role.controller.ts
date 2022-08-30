import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private RoleService: RoleService) {}
  @Post('addRole')
  addRole(@Body() dto: any) {
    return this.RoleService.addRole(dto);
  }
  @Get('getRoles')
  getRoles(){
    return this.RoleService.getRoles();
  }
  @Post('editRole')
  editRole(@Body() dto: any) {
    return this.RoleService.editRole(dto);
  }
  @Post('deleteRole')
  disableRol(@Body() dto: any) {
    return this.RoleService.disableRol(dto);
  }
}