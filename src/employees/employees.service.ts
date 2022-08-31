import { ForbiddenException, Injectable } from '@nestjs/common';
import { Empleado, PrismaClient } from '@prisma/client';
import { ok } from 'assert';
const prisma = new PrismaClient();

@Injectable({})
export class employeesService {
  async addEmployer(dto: any) {
    const docNumberExists = await prisma.empleado.findFirst({
      where: {
        docNumber: dto.docNumber,
      },
    });

    if (docNumberExists) {
      throw new ForbiddenException('Esta cédula ya existe');
    } else {
      if (dto.isContractor == true) {
        const maestro = await prisma.maestro.create({
          data: {
            name: dto.name,
            docNumber: dto.docNumber,
            laborID: dto.laborID,
            provinciaID: dto.provinciaId,
            proyectosIds: dto.proyectosIds,
          },
        });

        const employee = await prisma.empleado.create({
          data: {
            name: dto.name,
            calificacion: dto.calificacion,
            laborID: dto.laborID,
            proyectosIds: dto.proyectosIds,
            provinciaId: dto.provinciaId,
            maestroId: maestro.id,
            docNumber: dto.docNumber,
            contractDate: dto.contractDate,
            status: 'Activo',
          },
        });
        return employee;
      } else {
        const employee = await prisma.empleado.create({
          data: {
            name: dto.name,
            calificacion: dto.calificacion,
            laborID: dto.laborID,
            proyectosIds: dto.proyectosIds,
            provinciaId: dto.provinciaId,
            maestroId: dto.maestroId,
            docNumber: dto.docNumber,
            contractDate: dto.contractDate,
            status: 'Activo',
          },
        });
        return employee;
      }
    }
  }

  async getall() {
    const empleados = await prisma.empleado.findMany({
      include: {
        provincia: true,
        proyectos: true,
        maestro: true,
        labor: true,
      },
    });
    return empleados;
  }

  // async deleteAll() {
  //   await prisma.empleado.deleteMany();
  //   return 'Deleted';
  // }
  async deleteAllTemporalEntries() {
    await prisma.employeesEntry.deleteMany();
    return 'Deleted All Entries';
  }

  async getById(dto: Empleado) {
    const employee = await prisma.empleado.findFirst({
      where: {
        id: dto.id,
      },
    });
    return employee;
  }

  async getEmployeeEntryInfo(dto: any) {
    const employee = await prisma.empleado.findUnique({
      where: {
        id: dto.id,
      },
    });
    const path = 'http://119.8.10.22/uploads/';
    if (employee) {
      const newObj = {
        employee: employee,
        employeePhoto: `${path}${employee.id}.png`,
      };
      return newObj;
    } else {
      return new ForbiddenException('El empleado no existe');
    }
  }

  async updateEmployee(dto: Empleado) {
    const employee = await prisma.empleado.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        laborID: dto.laborID,
        proyectosIds: dto.proyectosIds,
        provinciaId: dto.provinciaId,
      },
    });
    return employee;
  }

  async isMaster(id: any) {
    const maestro = await prisma.maestro.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        labor: true,
      },
    });
    return {
      name: maestro?.name,
      labor: maestro?.labor.type,
    };
  }
  async isEmployee(id: any) {
    const employee = await prisma.empleado.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        maestro: {
          include: {
            labor: true,
          },
        },
      },
    });
    return {
      name: employee?.name,
      labor: employee?.maestro.labor,
    };
  }

  async employeEntry(dto: any) {
    try {
      const employee = await prisma.empleado.findFirst({
        where: {
          id: {
            equals: dto.id,
          },
        },
        include: {
          maestro: true,
        },
      });
      if (!employee) throw new ForbiddenException('no existe este empleado');
      if (employee.status == 'Inactivo')
        throw new ForbiddenException('Este usuario está inactivo');

      const entry = await prisma.temporalEntry.findFirst({
        where: {
          employeeID: employee.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (entry) {
        const fecha = new Date(entry?.createdAt).toLocaleDateString();
        const ahora = new Date().toLocaleDateString();
        if (fecha == ahora) {
          throw new ForbiddenException('Este usuario ya entro.');
        } else {
          await prisma.employeesEntry.create({
            data: {
              employeeID: entry.id,
              provinciaID: entry.provinciaID,
              maestroID: entry.maestroID,
              proyectoID: dto.proyectoID,
              nombre: employee.name,
              laborID: employee.maestro.laborID,
            },
          });
          await prisma.temporalEntry.create({
            data: {
              employeeID: entry.id,
              provinciaID: entry.provinciaID,
              maestroID: entry.maestroID,
              proyectoID: dto.proyectoID,
              nombre: employee.name,
              laborID: employee.maestro.laborID,
            },
          });
        }
      } else {
        await prisma.employeesEntry.create({
          data: {
            employeeID: employee.id,
            provinciaID: employee.provinciaId,
            maestroID: employee.maestroId,
            proyectoID: dto.proyectoID,
            nombre: employee.name,
            laborID: employee.maestro.laborID,
          },
        });
        await prisma.temporalEntry.create({
          data: {
            employeeID: employee.id,
            provinciaID: employee.provinciaId,
            maestroID: employee.maestroId,
            proyectoID: dto.proyectoID,
            nombre: employee.name,
            laborID: employee.maestro.laborID,
          },
        });
      }
    } catch (err) {
      return err + 'error';
    }
  }
  async employeeExit(dto: any) {
    try {
      const employee = await prisma.empleado.findFirst({
        where: {
          id: {
            equals: dto.id,
          },
        },
      });
      if (!employee) throw new ForbiddenException('no existe este empleado');

      const exit = await prisma.employeesExit.findFirst({
        where: {
          employeeID: employee.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (exit) {
        const fecha = new Date(exit?.createdAt).toLocaleDateString();
        const ahora = new Date().toLocaleDateString();
        if (fecha == ahora) {
          throw new ForbiddenException('Este usuario ya salio.');
        } else {
          await prisma.employeesExit.create({
            data: {
              employeeID: exit.id,
              provinciaID: exit.provinciaID,
              maestroID: exit.maestroID,
              proyectoID: dto.proyectoID,
              nombre: employee.name,
            },
          });
        }
      } else {
        await prisma.employeesExit.create({
          data: {
            employeeID: employee.id,
            provinciaID: employee.provinciaId,
            maestroID: employee.maestroId,
            proyectoID: dto.proyectoID,
            nombre: employee.name,
          },
        });
      }
    } catch (err) {
      return err + 'error';
    }
  }
  async getEntries() {
    const entries = await prisma.employeesEntry.findMany({
      include: {
        employee: {
          select: {
            proyectos: true,
            provincia: true,
            name: true,
            labor: true,
          },
        },
      },
    });
    return entries;
  }

  async getTemporalEntries() {
    const entries = await prisma.temporalEntry.findMany({
      include: {
        employee: {
          select: {
            proyectos: true,
            provincia: true,
            name: true,
            labor: true,
          },
        },
      },
    });
    return entries;
  }

  async getCountEntries() {
    const entries = await prisma.employeesEntry.count({
      select: {
        _all: true
      },
    });
    return entries;
  }

  async getEntriesByProject(dto: any) {
    const entries = await prisma.temporalEntry.findMany({
      where: {
        proyectoID: {
          in: dto.idArray,
        },
      },
    });
    return entries;
  }

  async filterEntries(dto: any) {
    const queryArgs = {
      where: {},
    };
    if (dto.maestroId) {
      queryArgs.where = {
        maestroID: dto.maestroId,
        ...queryArgs.where,
      };
    }
    if (dto.project) {
      queryArgs.where = {
        proyectoID: dto.project,
        ...queryArgs.where,
      };
    }
    if (dto.laborID) {
      queryArgs.where = {
        laborID: dto.laborID,
        ...queryArgs.where,
      };
    }
    if (dto.search) {
      queryArgs.where = {
        nombre: {
          contains: dto.search,
          mode: 'insensitive',
        },
        ...queryArgs.where,
      };
    }
    const entries = await prisma.employeesEntry.findMany({
      ...queryArgs,
      take: dto.limit,
       include: {
         employee: {
           select: {
             proyectos: true,
             provincia: true,
             name: true,
             labor: true,
             maestro: {
               select: {
                 labor: true,
                 name: true,
               },
             },
           },
         },
         proyecto: true,
       },
      
      orderBy: {
        createdAt: 'asc',
      },
    });
    return entries;
  }

  async filterExits(dto: any) {
    const queryArgs = {
      where: {},
    };
    if (dto.province) {
      queryArgs.where = {
        provinciaID: dto.province,
        ...queryArgs.where,
      };
    }
    if (dto.project) {
      queryArgs.where = {
        proyectoID: dto.project,
        ...queryArgs.where,
      };
    }
    if (dto.maestro) {
      queryArgs.where = {
        maestroID: dto.maestro,
        ...queryArgs.where,
      };
    }
    if (dto.search) {
      queryArgs.where = {
        nombre: {
          contains: dto.search,
          mode: 'insensitive',
        },
        ...queryArgs.where,
      };
    }
    const exits = await prisma.employeesExit.findMany({
      ...queryArgs,
      include: {
        employee: {
          select: {
            proyectos: true,
            provincia: true,
            name: true,
            labor: true,
          },
        },
        proyecto: true,
      },
    });
    return exits;
  }

  async getEntriesbyProvince(dto: any) {
    const entries = await prisma.temporalEntry.findMany({
      where: {
        provinciaID: dto.id,
      },
    });
    return entries;
  }

  async getEntriesByMaestro(dto: any) {
    const employee = await prisma.temporalEntry.findMany({
      where: {
        maestroID: dto.id,
        AND: {
          proyectoID: dto.projectID,
        },
      },
      select: {
        createdAt: true,
        employee: true,
      },
    });
    return employee;
  }

  async getEntriesByLabor(dto: any) {
    const employee = await prisma.temporalEntry.findMany({
      where: {
        laborID: dto.id,
        AND: {
          proyectoID: dto.projectID,
        },
      },
      select: {
        createdAt: true,
        employee: true,
      },
    });
    return employee;
  }

  // async getEntriesByLabor(dto: any){
  //   const entries = await prisma.temporalEntry.findMany({
  //     where:{
  //       laborID:{
  //         in: dto.idArray
  //       },AND:{
  //         proyectoID: dto.projectID
  //       }
  //     },
  //     select:{
  //       createdAt: true,
  //       employee: true,
  //       laborID: true
  //     }
  //   })
  //   //const laborIdArray = entries.map((entrie)=> entrie.laborID)
  //   let uniqueLaborIds = Array.from(new Set(entries.map((entry)=> entry.laborID)))
  //   console.log('uniqueLaborIds', uniqueLaborIds)
  //   return entries
  // }

  async filterEmployees(dto: any) {
    const queryArgs = {
      where: {},
    };
    if (dto.search) {
      queryArgs.where = {
        name: {
          contains: dto.search,
          mode: 'insensitive',
        },
      };
    }
    if (dto.status) {
      queryArgs.where = {
        status: dto.status,
        ...queryArgs.where,
      };
    }
    if (dto.maestroId) {
      queryArgs.where = {
        maestroId: dto.maestroId,
      };
    }
    if (dto.proyectoID) {
      queryArgs.where = {
        proyectosIds: {
          has: dto.proyectoID,
        },
      };
    }

    const employees = await prisma.empleado.findMany({
      ...queryArgs,
      take: dto.limit,
      include: {
        provincia: true,
        proyectos: true,
        labor: true,
        maestro: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return employees;
  }
  async deleteEmployee(dto: any) {
    const employee = await prisma.empleado.findUnique({
      where: {
        id: dto.id,
      },
    });

    if (employee?.status == 'Activo') {
      await prisma.empleado.update({
        where: {
          id: dto.id,
        },
        data: {
          status: 'Inactivo',
        },
      });
    } else {
      await prisma.empleado.update({
        where: {
          id: dto.id,
        },
        data: {
          status: 'Activo',
        },
      });
    }
    return employee;
  }
  async editEmployee(dto: any) {
    const employee = await prisma.empleado.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        laborID: dto.laborID,
        calificacion: dto.calificacion,
        proyectosIds: dto.proyectosIds,
        docNumber: dto.docNumber,
        provinciaId: dto.provinciaId,
        maestroId: dto.maestroId,
        contractDate: dto.contractDate,
      },
    });
    return employee;
  }

  async getAbsentEmployee(dto: any) {
    const queryArgs = {
      where: {},
    };
    if (dto.province) {
      queryArgs.where = {
        provinciaId: dto.province,
      };
    }

    const employee = await prisma.empleado.findMany({
      ...queryArgs,
      include: {
        provincia: true,
        proyectos: true,
        maestro: true,
      },
    });

    return employee;
  }
  async changeLabor() {
    // await prisma.empleado.updateMany({
    //   data: {
    //     calificacion: 1
    //   }
    // })
    // const empleados = await prisma.employeesEntry.deleteMany({
    //   where: {
    //     createdAt: {
    //       gt: new Date('2022-06-06T19:04:06.570+00:00')
    //     },
    //     provinciaID: "6299071d7d0cd9afc7e030e2"
    //   }
    // })
    // console.log(empleados)
    // const empleados = await prisma.temporalEntry.deleteMany({

    // })
    // console.log(empleados)
    // await prisma.employeesEntry.deleteMany({
    //   where: {

    //   }
    // })
    // const empleados = await prisma.empleado.findMany({
    //   where: {
    //     proyectosIds: {
    //       has: '629907827d0cd9afc7e030e4',
    //     },
    //   },
    // });
    // console.log(empleados);
    // empleados.map(async (i) => {
    //   this.employeEntry({
    //     id: i.id.toString(),
    //     proyectoID: '629907827d0cd9afc7e030e4',
    //   });
    // });
    // const names = ["Remo", "Remy", "Ren", "Renars", "Reng", "Rennie", "Reno", "Reo", "Reuben", "Rexford", "Reynold"]
    // console.log(names)
    //  const empleados = await prisma.empleado.findMany({
    //    where: {
    //      provinciaId: "6299071d7d0cd9afc7e030e2"
    //    },
    //    include: {
    //      proyectos: {
    //        select: {
    //          id: true,
    //          name: true
    //        }
    //      },
    //      maestro: true
    //    }
    //  })
    //  await prisma.proyecto.findFirst({
    //   where: {
    //     provinciaId: "62729e48dc2e23c45cc715ac"
    //   }
    // }).then(async(res)=>{
    //   await prisma.maestro.updateMany({
    //     where: {
    //       proyectosIds: {
    //         has: "629904577d0cd9afc7e030d8"
    //       }
    //     },
    //     data: {
    //       provinciaID: "62729e41dc2e23c45cc71592"
    //     }
    //   })
    // })

    //  empleados.map(async (i)=>{
    //    await prisma.employeesEntry.create({
    //      data: {
    //       createdAt: new Date('2022-06-01T10:25:40.239+00:00'),
    //       nombre: i.name,
    //       employeeID: i.id,
    //       provinciaID: i.provinciaId,
    //       proyectoID: i.proyectosIds[0],
    //       maestroID: i.maestroId,
    //       laborID: i.maestro.laborID
    //      }
    //    })
    //  })
    // const labores = await prisma.labor.findMany({
    //   select: {
    //     type: true,
    //     id: true,
    //   }
    // })

    // labores.map(async (i) =>{
    //   await prisma.empleado.updateMany({
    //     where: {
    //       role: i.type
    //     },
    //     data: {
    //       laborID: i.id
    //     }
    //   })
    // })

    // // // console.log(maestros, proyectos, labores)

    // names.forEach(async (i)=>{
    //   await prisma.empleado.create({
    //     data:{
    //       name: i,
    //       role: labores[Math.floor(Math.random() * 11)].type,
    //       proyectosIds: ['629907827d0cd9afc7e030e4'],
    //       provinciaId: '62729e47dc2e23c45cc715a8',
    //       maestroId: '629e7605e2fceff599e9b93b',
    //     }
    //   })
    // })
    const hola = await prisma.empleado.findMany({
      where: {
        proyectosIds: {
          hasEvery: ['629905327d0cd9afc7e030dd', '6299055d7d0cd9afc7e030de'],
        },
      },
    });
    return hola;
    // const employee = await prisma.empleado.findMany({
    //   where: {
    //     laborID: null
    //   }
    // })
    // return employee
    // await prisma.empleado.updateMany({
    //   where: {
    //     role:
    //   }
    // })
  }

  async updateUser() {
    await prisma.empleado.updateMany({
      data: {
        status: 'Activo',
      },
    });
  }

  async changeRating(dto: any) {
    await prisma.empleado.update({
      where: {
        id: dto.id,
      },
      data: {
        calificacion: parseInt(dto.rating),
      },
    });
    return ok;
  }
}
