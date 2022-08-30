import { EmployeeAccident } from '@prisma/client';

export interface IEmployeeAccident {
  addAccident(dto: EmployeeAccident): Promise<EmployeeAccident>;
  accidentList(dto: any): Promise<object[]>;
  editAccident(dto: EmployeeAccident): Promise<Partial<EmployeeAccident>>;
  disableAccident(dto: string): Promise<EmployeeAccident>;
  // getfile(dto: any): Promise<string>;
}