import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { SignUpDTO } from './dtos/sign-up.dto';
import { SignInDTO } from './dtos/sign-in.dto';
import { IAuthService } from './i-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly _authService: IAuthService,
  ) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDTO, @Res() res: Response) {
    const { token, user } = await this._authService.signUp(signUpDto);

    return res
      .status(HttpStatus.CREATED)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === 'production',
      })
      .json({
        success: true,
        token,
        user,
        message: 'Signed Up Successfully',
      });
  }

  @Post('signin')
  async signin(@Body() signInDto: SignInDTO, @Res() res: Response) {
    const { token, user } = await this._authService.signIn(signInDto);

    return res
      .status(HttpStatus.OK)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === 'production',
      })
      .json({
        success: true,
        token,
        user,
        message: 'Signed in Successfully',
      });
  }

  @Delete('signout')
  signout(@Res() res: Response) {
    this._authService.signOut(res);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Signed Out Successfully',
    });
  }
}
