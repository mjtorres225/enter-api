import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable({})
export class provinciasService {
 
  async getall() {
    const provincias = await prisma.provincia.findMany({
      include: {
        proyectos: true,
      },
    });
    return provincias;
  }
  async provinceInfo() {
    const provincia = await prisma.provincia.findMany({
      include: {
        proyectos: {
          include:{
            empleados: true,
            maestros: true
          }
        },
        empleados: true,
        employeeEntry: true,
        employeeEntries: true
      },
    });
    return provincia;
  }
  async editProvince(dto: any) {
    const province = await prisma.provincia.update({
      where: {
        id: dto.provinceId,
      },
      data: {
        name: dto.province
      },
    });
    return province as any;
  }
  async getallFiltered(dto : any) {
    const provincias = await prisma.provincia.findMany({
      where:{
        name:  {
          contains: dto.search
        }
      },
      include: {
        proyectos: true,
      },
    });
    return provincias;
  }
}
