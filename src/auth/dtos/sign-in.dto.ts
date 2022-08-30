import { IsDefined } from "class-validator";
import { IsNotEmpty, IsValidEmail } from "src/common/decorators";

export class SignInDTO {
    @IsNotEmpty()
    @IsValidEmail()
    @IsDefined({message: "El correo electrónico es obligatorio."})
    readonly email: string;

    @IsNotEmpty()
    @IsDefined({message: 'La contraseña es obligatoria.'})
    readonly password: string;
}