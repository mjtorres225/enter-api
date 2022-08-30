import { Body, Controller, Post } from '@nestjs/common';
import { VisitService } from './visits.service';

@Controller('visits')
export class VisitsController {
  constructor(private VisitService: VisitService) {}

  @Post('filterVisit')
  filterVisits(@Body() dto: any) {
    return this.VisitService.filterVisits(dto);
  }
  @Post('addVisit')
  addVisit(@Body() dto: any) {
    return this.VisitService.addVisit(dto);
  }
  @Post('editVisit')
  editVisit(@Body() dto: any) {
    return this.VisitService.editVisit(dto);
  }
  @Post('deleteVisit')
  deleteVisit(@Body() dto: any) {
    return this.VisitService.delteVisit(dto);
  }
  @Post('deleteAll')
  deleteAll() {
    return this.VisitService.deleteAll();
  }
  @Post('visitEntry')
  visitEntry(@Body() dto :any) {
    return this.VisitService.visitEntry(dto);
  }
}
