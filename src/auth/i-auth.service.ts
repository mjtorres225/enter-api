import { Users } from "@prisma/client";
import { SignInDTO } from "./dtos/sign-in.dto";
import { SignUpDTO } from "./dtos/sign-up.dto";
import { Response } from "express";

export interface IAuthResult {
    user: Users;
    token: string;
    
}

export interface IAuthService {
    signUp(user: SignUpDTO): Promise<IAuthResult>;
    signIn(user: SignInDTO): Promise<IAuthResult>;
    signOut(res: Response): void;
}