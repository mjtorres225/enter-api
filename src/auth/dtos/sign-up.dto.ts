import { IsBoolean, IsDefined, MinLength } from "class-validator";
import { IsNotEmpty, IsValidEmail } from "src/common/decorators";

export class SignUpDTO {
    @IsNotEmpty()
    @IsDefined({message: 'El nombre es obligatorio.'})
    readonly name: string;

    @IsNotEmpty()
    @IsValidEmail()
    @IsDefined({message: "El correo electrónico es obligatorio."})
    readonly email: string;

    @IsDefined({message: "La propiedad isAdmin es obligatoria."})
    @IsNotEmpty()
    @IsBoolean({  message: "La propiedad isAdmin debe ser booleana."} )
    readonly isAdmin: boolean;

    @IsNotEmpty()
    @MinLength(6, {message: "La contraseña debe tener al menos 6 caracteres."})
    @IsDefined({message: 'La contraseña es obligatoria.'})
     password: string;
}