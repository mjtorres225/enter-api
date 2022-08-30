import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class LaborService {
  async addLabor(dto: any) {
    const labor = await prisma.labor.create({
      data: {
        type: dto.name,
        description: dto.description,
        status: true,
      },
    });
    return labor;
  }
  async getLabores() {
    const Labores = await prisma.labor.findMany({
      where: {
        status: true,
      },
      select: {
        id: true,
        type: true,
        description: true,
        empleados: true,
        maestros: {
          select: {
            name: true,
            docNumber: true,
            laborID: true,
          },
        },
      },
    });
    return Labores;
  }
  async editLabor(dto: any) {
    const edited = await prisma.labor.update({
      where: {
        id: dto.id,
      },
      data: {
        type: dto.name,
        description: dto.description,
      },
    });
    return edited;
  }
  async disableLabor(dto: any) {
    const disabled = await prisma.labor.update({
      where: {
        id: dto.id,
      },
      data: {
        status: false,
      },
    });
    return disabled;
  }

  async getById(id : string){
    const labor = await prisma.labor.findFirst({
      where:{
        id:{
          equals: id,
        },status:{
          equals: true
        }
      },include: {
        maestros: true
      }
    });
    return labor
  }

  async getAllLabors(array : string){
    const labors = await prisma.labor.findMany({
      where:{
        id:{
          in: array
        },status:{
          equals: true
        }
      },include:{
        maestros: true
      }
    })
    return labors
  }



}
