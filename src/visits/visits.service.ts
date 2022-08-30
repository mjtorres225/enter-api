import { Injectable } from '@nestjs/common';
import { PrismaClient, Visit } from '@prisma/client';
import { ok } from 'assert';

const prisma = new PrismaClient();
@Injectable()
export class VisitService {
  async filterVisits(dto: any) {
    const queryArgs = {
      where: {},
    };
    if (dto.search) {
      queryArgs.where = {
        name: {
          contains: dto.search,
          mode: 'insensitive',
        },
        ...queryArgs.where,
      };
    }
    if (dto.proyectoID) {
      queryArgs.where = {
        projectID: dto.proyectoID,
        ...queryArgs.where,
      };
    }
    const visits = await prisma.visit.findMany({
      ...queryArgs,
      include: {
        proyecto: true,
      },
    });
    return visits;
  }
  async addVisit(dto: Visit) {
    await prisma.visit.create({
      data: {
        ...dto,
      },
    });
    return ok;
  }
  async delteVisit(dto: any) {
    await prisma.visit.delete({
      where: {
        id: dto.id,
      },
    });
  }
  async deleteAll() {
    await prisma.visit.deleteMany({});
    return ok;
  }
  async visitEntry(dto: any) {
    let visitante;

    try {
      visitante = await prisma.visit.findFirst({
        where: {
          id: dto.id,
        },
      });
    } catch (Error) {
      return { message: 'Esta Visita no existe' };
    }

    const today = new Date();
    if (visitante) {
      if (visitante.status == 'Activo') {
        await prisma.visit.update({
          where: {
            id: visitante.id,
          },
          data: {
            status: 'Salida',
          },
        });
        return { message: 'Salida registrada Correctamente' };
      }

      if (visitante.status == 'Salida') {
        return { message: 'La visita ya fue realizada' };
      }

      if (
        visitante.status == 'Caducado' ||
        visitante.final.toLocaleString() < today.toLocaleString()
      ) {
        await prisma.visit.update({
          where: {
            id: dto.id,
          },
          data: {
            status: 'Caducado',
          },
        });
        return { message: 'Esta visita esta caducada' };
      } else {
        await prisma.visit.update({
          where: {
            id: dto.id,
          },
          data: {
            status: 'Activo',
          },
        });
      }
    } else {
      return { message: 'Esta visita no esta registrada' };
    }
    return visitante;
  }

  async editVisit(dto: any) {
    await prisma.visit.update({
      where: {
        id: dto.id,
      },
      data: {
        projectID: dto.projectID,
        docNumber: dto.docNumber,
        name: dto.name,
        company: dto.company,
        email: dto.email,
        position: dto.position,
        start: dto.start,
        final: dto.final,
      },
    });
  }
}
