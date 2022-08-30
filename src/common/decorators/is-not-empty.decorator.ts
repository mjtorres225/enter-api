import { registerDecorator, ValidationOptions } from "class-validator";

export function IsNotEmpty(validationOptions?: ValidationOptions): Function {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      name: "IsNotEmpty",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: `El campo '${propertyName}' es obligatorio.`,
        ...validationOptions,
      },
      validator: {
        validate(value: any): boolean {
          if (!value) return false;

          if (typeof value === "string") return value.length > 0;

          return Boolean(value);
        },
      },
    });
  };
}
