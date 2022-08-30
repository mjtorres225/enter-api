import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';

@Controller('project')
export class ProyectoController {
  constructor(private ProyectoService: ProyectoService) {}

  @Get('get-projects')
  getall() {
    return this.ProyectoService.getProjects();
  }
  @Get('get')
  get() {
    return this.ProyectoService.get();
  }
  @Post('filterprojects')
  filterProjects(@Body() dto: any) {
    return this.ProyectoService.filterProjects(dto);
  }
  @Post('addProject')
  addProyect(@Body() dto: any) {
    return this.ProyectoService.addProyect(dto);
  }
  @Post('editproject')
  editProject(@Body() dto: any) {
    return this.ProyectoService.editProject(dto);
  }

  @Post('getByProvince')
  getProjectsByProvince(@Body() dto: any) {
    return this.ProyectoService.getProjectsByProvince(dto);
  }

  @Post('getById')
  getProjectsNameById(@Body() dto: any) {
    return this.ProyectoService.getProjectById(dto);
  }
}
