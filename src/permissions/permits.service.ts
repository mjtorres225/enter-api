import { Injectable } from '@nestjs/common';
import { Permits, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
export class permitsService {

  async addPermit(dto : Permits) {
    const user = await prisma.permits.create({
      data: {
      idEmployee: dto.idEmployee,
      description: dto.description,
      },
    });
    return user;
  }
  async getall(dto: any) {
    let queryArgs = {
      where: {},
    };
    if (dto.employee) {
      queryArgs.where = {
        idEmployee: dto.employee,
      };
    }

    const user = await prisma.permits.findMany({
      ...queryArgs,
      include: {
        Employee: true
      }
    });
    return user;
  }

}