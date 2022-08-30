import { Injectable } from "@nestjs/common";
import { Labor, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class laborService {
  async addLabor(dto: Labor) {
    const labor = await prisma.labor.create({
      data: {
        type: dto.type,
        description: dto.description
      },
    });
    return labor;
  }

  async getall() {
    const labor = await prisma.labor.findMany({
      include: {
       maestros: true,
       empleados: true,
      },
    });
    return labor;
  }

}