import { Users } from '@prisma/client';

export interface IUsersService {
  addUser(dto: Users): Promise<Users>;
  getAll(): Promise<Object[]>;
  getByEmail(email: string): Promise<Partial<Users>>;
  getById(id: string): Promise<Partial<Users>>;
  filterUsers(dto: Users): Promise<Object[]>;
  editUser(dto: Users): Promise<Partial<Users>>;
  disableUser(dto: Users): Promise<Object[]>;
}
