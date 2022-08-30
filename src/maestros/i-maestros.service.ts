import { Maestro } from '@prisma/client';

export interface IMaestroService {
  addMaestro(dto: any): Promise<Maestro>;
  getMaestros(): Promise<object[]>;
  // getById(id: any): Promise<object[]>;
  filterMaestro(dto: any): Promise<object[]>;
  editMaestro(dto: any): Promise<object[]>;
  disableMaestro(dto: Maestro): Promise<object[]>;
  getByProject(dto: Maestro): Promise<object[]>;
  getByProvinceProject(dto: any): Promise<object[]>;
  // deleteAll(): Promise<object>;
}
