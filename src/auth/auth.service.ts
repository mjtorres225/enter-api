import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { IUsersService } from 'src/users/i-user.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import { IAuthResult, IAuthService } from './i-auth.service';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUsersService') private readonly _usersService: IUsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async signUp(userDto: SignUpDTO): Promise<IAuthResult> {
    await this.validateSignUpEmail(userDto.email);
    userDto.password = await this.hashPassword(userDto.password);

    const user = await this._usersService.addUser(userDto as any);
    
    const userCopy = {
      ...user,
    };
    console.log(userDto)
    delete (userCopy as unknown as any)?.password;

    const authResult: IAuthResult = {
      user: userCopy,
      token: this.getToken(userCopy),
    };

    return authResult;
  }

  async signIn(userDto: SignInDTO): Promise<IAuthResult> {
    const user = await this._usersService.getByEmail(userDto.email);
    if (!user) throw new ForbiddenException('Las credenciales son incorrectas');

    await this.validatePassword(userDto.password, user as Users);

    const userCopy = {
      ...user,
    };
    delete userCopy.password;
    
    const authResult: IAuthResult = {
      user: userCopy as Users,
      token: this.getToken(userCopy as Users),
    };
    console.log(authResult)
    return authResult;
  }

  signOut(res: Response<any, Record<string, any>>): void {
    res.clearCookie('token');
  }

  private async validateSignUpEmail(email: string): Promise<void> {
    const user = await this._usersService.getByEmail(email);

    if (user)
      throw new BadRequestException('Ese correo electrónico ya está tomado.');
  }

  private async validatePassword(password: string, user: Users): Promise<void> {
    const isPasswordRight = await bcrypt.compare(password, user.password);

    if (!isPasswordRight)
      throw new ForbiddenException('Las credenciales son incorrectas');
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  private getToken({ id, name, lastName, email }: Users): string {
    return this._jwtService.sign({
      id,
      name: `${name} ${lastName}`,
      email,
    });
  }
}
