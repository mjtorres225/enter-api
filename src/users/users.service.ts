import { Injectable } from '@nestjs/common';
import { PrismaClient, Users } from '@prisma/client';
import { IUsersService } from './i-user.service';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

@Injectable()
export class UsersService implements IUsersService {
  async addUser(dto: any) {
    const user = await prisma.users.create({
      data: {
        name: dto.name,
        lastName: dto.lastName,
        email: dto.email,
        status: true,
        docNumber: dto.docNumber,
        password: dto.password,
        userCreated: true,
        roleID: dto.roleID,
        proyectoID: dto.proyectoID ? dto.proyectoID : null,
      },
    });
    return user;
  }

  async editUser(dto: any) {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const user = await prisma.users.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        lastName: dto.lastName,
        email: dto.email,
        docNumber: dto.docNumber,
        password: hashedPassword,
        userCreated: true,
        roleID: dto.roleID,
        proyectoID: dto.proyectoID,
      },
      select: {
        name: true,
        docNumber: true,
        email: true,
        lastName: true,
        role: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return user as any;
  }
  async disableUser(dto: any) {
    const user = await prisma.users.update({
      where: {
        id: dto.id,
      },
      data: {
        status: false,
      },
      select: {
        name: true,
        docNumber: true,
        email: true,
        lastName: true,
        role: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return user as any;
  }

  async getAll() {
    const user = await prisma.users.findMany();
    return user;
  }

  async filterUsers(dto: any) {
    let queryArgs = {
      where: {},
    };
    if (dto.role) {
      queryArgs = {
        where: {
          roleID: dto.role,
        },
      };
    }
    if (dto.search) {
      queryArgs.where = {
        name: {
          contains: dto.search,
          mode: 'insensitive',
        },
        ...queryArgs.where,
      };
    }
    queryArgs.where = {
      status: true,
      ...queryArgs.where,
    };
    const users = await prisma.users.findMany({
      ...queryArgs,
      select: {
        id: true,
        name: true,
        docNumber: true,
        email: true,
        lastName: true,
        role: {
          select: {
            name: true,
            id: true,
          },
        },
        proyecto: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return users;
  }
  async getByEmail(email: string): Promise<Partial<Users>> {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        name: true,
        lastName: true,
        docNumber: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
        password: true,
        proyectoID: true,
      },
    });

    return user as any;
  }

  async getById(id: string) {
    const user = await prisma.users.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
        lastName: true,
        docNumber: true,
        email: true,
        password: true,
      },
    });

    return user as Users;
  }
}
