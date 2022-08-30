import { registerDecorator, ValidationOptions } from "class-validator";

export function IsValidDate(validationOptions?: ValidationOptions): Function {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      name: "IsValidDate",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: "La fecha debe estar en el formato 'YYYY-MM-DD'.",
        ...validationOptions,
      },
      validator: {
        validate(value: any): boolean {
          const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
          return typeof value === "string" && regex.test(value);
        },
      },
    });
  };
}
