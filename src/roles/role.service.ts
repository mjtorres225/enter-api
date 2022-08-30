import { Injectable } from '@nestjs/common';
import { PrismaClient, userRole } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class RoleService {
  async addRole(dto : userRole) {
    const rol = await prisma.userRole.create({
        data: {
          name: dto.name,
          description: dto.description,
          status: true,
        },
      });
      return rol;
  }
  async getRoles() {
    const roles = await prisma.userRole.findMany({
      where:{
        status: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        users: {
          select: {
            name: true,
            lastName: true,
            email: true,
            roleID: true,
          }
        },
      },
    });
    return roles;
  }
  async editRole(dto : userRole) {
    let edited = await prisma.userRole.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
    return edited
  }
  async disableRol(dto : userRole) {
    let disabled = await prisma.userRole.update({
      where: {
        id: dto.id,
      },
      data: {
        status: false,
      },
    });
    return disabled
  }
}
